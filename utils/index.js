/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const os = require('os');

const platform = (function (platform) {
  if (platform == 'linux') return 'Linux';
  if (platform === 'darwin') return 'Mac';
  if (['win32', 'win64'].includes(platform)) return 'Windows';
  return 'Other';
})(os.platform().toLowerCase());

// 随机字符
function randomStr(key = 'x') {
  const time = Date.now() || performance.now();
  const random = (time + Math.random() * 16) % 16 | 0;
  return (key === 'x' ? random : (random & 0x3) | 0x8).toString(16);
}

function getUUID(format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
  return format.replace(/[xy]/g, v => randomStr(v));
}

module.exports = {platform, getUUID};
