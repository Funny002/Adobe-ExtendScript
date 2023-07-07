/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function RunExec(opt) {
  const runPath = path.resolve(opt.tempDir, opt.runName + '.scpt');
  const content = `tell application "${ opt.application }"\r\n  do javascript "${ opt.scripts.replace(/[\\"]/g, '\\$&') }"\r\nend tell`;
  fs.writeFileSync(runPath, content, { encoding: 'utf8' });
  return new Promise((resolve, reject) => {
    exec(`osascript ${ runPath }`, function (err, stdout, stderr) {
      if (err) return reject(err.message);
      if (stderr) return reject(stderr);
      fs.unlink(runPath, function (err) {
        if (err) console.error(err);
      });
      resolve(stdout);
    });
  });
}

module.exports = RunExec;
