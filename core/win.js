/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

function RunExec(opt) {
  const list = opt.application.split(/\\|\//);
  const runPath = path.resolve(opt.tempDir, opt.runName + '.js');
  fs.writeFileSync(runPath, opt.scripts, { encoding: 'utf8' });

  return new Promise((resolve, reject) => {
    const callback = () => setTimeout(() => {
      fs.unlink(runPath, function (err) {
        if (err) console.error(err);
      });
      resolve();
    }, 1000);

    const watcher = fs.watch(opt.tempDir, (type, filename) => {
      if (filename === opt.resultName) {
        watcher.close();
        callback();
      }
    });

    exec(`${ list.pop() } -r ${ runPath }`, { cwd: list.join('/') });
  });
}

module.exports = RunExec;
