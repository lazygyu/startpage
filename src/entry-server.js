import { app, store } from './app'

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  const s = isDev && Date.now();

  return Promise.resolve(app);
}