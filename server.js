const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  compression = require('compression'),
  resolve = file => path.resolve(__dirname, file),
  http = require('http'),
  https = require('https');

let privateKey, certificate;

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  privateKey = fs.readFileSync('/etc/letsencrypt/live/lazygyu.net/privkey.pem');
  certificate = fs.readFileSync('/etc/letsencrypt/live/lazygyu.net/fullchain.pem');
}

const app = express();

let renderer;
if (isProd) {
  const bundle = require('./dist/vue-ssr-bundle.json');
  const template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8');
  renderer = createRenderer(bundle, template);
} else {
  require('./build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template);
  });
}

function createRenderer(bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  });
}

const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 });

app.use(compression({ threshold: 0 }));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./static', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

app.get('/weather/:type/:lat/:lon', (req, res) => { 
  let pt = '';
  if (req.params.type == 'summary') {
    pt = '/weather/summary';
  } else if (req.params.type == 'current') {
    pt = '/weather/current/hourly';
  }
  pt += '?version=1&lat=' + req.params.lat + '&lon=' + req.params.lon;
  const headers = { appKey: '4213e61a-857a-359c-9a94-e409a538f0b3' };
  http.request({ host: 'apis.skplanetx.com', method: 'GET', path: pt, headers: headers }, (resp) => {
    let body = '';
    resp.setEncoding('utf8');
    resp.on('data', (chunk) => { 
      body += chunk;
    });
    resp.on('end', () => { 
      res.end(body);
    });
   }).end();
});

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('준비중입니다. 잠시 후에 다시 시도해주세요.');
  }

  const s = Date.now();
  res.setHeader("Content-type", "text/html");

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | 찾으시는 페이지가 없습니다.');
    } else {
      res.status(500).end('500 | 서버 오류입니다.');
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  }

  renderer.renderToStream({ url: req.url })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request : ${Date.now() - s}ms`))
    .pipe(res);
});

const port = process.env.PORT || 7568;
if (!isProd) {
  app.listen(port, () => { console.log(`server listening : ${port}`) });
} else {
  https.createServer({ key: privateKey, cert: certificate }, app).listen(7568);
}  
