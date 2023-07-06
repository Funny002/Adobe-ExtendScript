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

module.exports = {platform};
