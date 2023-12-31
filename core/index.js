/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');
const { platform, getUUID } = require('../utils/index.js');

const callbackStr = '(function(){\
  var result = {status: true, data: null, error: null};\
  try{\
    result.data = (function(){\
      return ${script};\
    })() || null;\
  } catch(e) {\
    result.status = false;\
    result.error = e.message;\
  }\
  var file = File("${temp}");\
  file.open("w");\
  file.write("module.exports = " + result.toSource());\
  file.close();\
})()';

function handlerMinifyFunc(script) {
  const options = { sourceMap: false, mangle: false, compress: { conditionals: false } };
  return uglify.minify(script, options).code;
}

module.exports = {
  handlerOptions(opt) {
    opt.runName = getUUID('Run-xxx-xxx4-xx4x');
    opt.resultName = getUUID('Result-xxx-xxx4-xx4x.js');
    let resultName = path.resolve(opt.tempDir, opt.resultName);
    if (platform === 'Windows') resultName = resultName.split('\\').join('\\\\');

    const includes = [];
    opt.tempIncludes = opt.includes.reduce(function (value, paths) {
      const content = fs.readFileSync(paths, { encoding: 'utf8' });
      let newPath = path.resolve(opt.tempDir, getUUID('xxxxxxxx.js'));
      if (platform === 'Windows') newPath = newPath.split('\\').join('\\\\');
      fs.writeFileSync(newPath, opt.minify ? handlerMinifyFunc(content) : content, { encoding: 'utf8' });
      includes.push(`$.evalFile("${ newPath }");`);
      return value.concat(newPath);
    }, []);

    const content = includes.concat(callbackStr.replace(/\$\{([^\}]+)\}/g, function (types) {
      if (types === '${script}') return opt.scripts;
      if (types === '${temp}') return resultName;
      return types;
    })).join('\r');

    opt.scripts = opt.minify ? handlerMinifyFunc(content) : content;
  },
  getResult(opt, timeout = 1000) {
    const resultName = path.resolve(opt.tempDir, opt.resultName);
    const result = require(resultName);
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          for (const paths of opt.tempIncludes) {
            fs.unlinkSync(paths);
          }
          fs.unlinkSync(resultName);
          result.status ? resolve(result.data) : reject(new Error(result.error));
        } catch (e) {
          reject(e);
        }
      }, timeout);
    });
  },
};
