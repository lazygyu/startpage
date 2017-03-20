const arrDay = ['일', '월', '화', '수', '목', '금', '토'];

const weatherIcon = {
  SKY_A01:"sun",
  SKY_A02:"clouds-sun",
  SKY_A03:"cloud",
  SKY_A04:"clouds",
  SKY_A05:"rain",
  SKY_A06:"snow",
  SKY_A07:"hail"
}

export function digitPad(n, digit) {
  if (digit < n.length) return n.substr(0, digit);
  return (Array(digit).fill(0).join() + n).substr(-digit);
}

export function dayString(n) {
  return arrDay[n];
}

export function weather2Icon(code, hour) {
  let icon = weatherIcon[code.replace(/_[AMDY]/, '_A')];
  if (hour >= 20 && hour < 6) {
    icon = icon.replace(/sun/, 'moon');
  }
  return 'diw-' + icon;
}

export function autoLink(str){
  const pat = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/ig;
  return str.replace(pat, '<a href="$&" target="_blank">$&</a>');
}