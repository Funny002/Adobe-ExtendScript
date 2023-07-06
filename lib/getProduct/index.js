/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const {exec, execSync} = require('child_process');
const {platform} = require('../../utils/index.js');

const {command, handleStdout} = (function () {
  if (platform === 'Windows') {
    return require('./win.js');
  } else if (platform === 'Mac') {
    return require('./mac.js');
  } else {
    throw new Error('please use on Windows and Mac');
  }
})();

module.exports = {
  exec() {
    return new Promise((resolve, reject) => {
      exec(command, {encoding: 'utf8'}, function (err, stdout) {
        if (err) return reject(err);
        resolve(handleStdout(stdout).toString('utf8'));
      });
    });
  },
  execSync() {
    try {
      return handleStdout(execSync(command, {encoding: 'utf8'}).toString('utf8'));
    } catch (e) {
      throw new Error(e);
    }
  },
};
