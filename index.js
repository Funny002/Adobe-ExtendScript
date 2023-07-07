/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const { platform } = require('./utils/index.js');
const getProduct = require('./lib/getProduct');
const result = require('./core/index.js');
const path = require('path');
const fs = require('fs');
const os = require('os');

function handlesApplication(application) {
  // no type string, no null
  if (typeof application !== 'string') throw new Error('The application parameter cannot be missing');
  if (!application) throw new Error('The application parameter cannot be missing');
  // has paths
  if (/^([A-Z]:(\/|\\)|\/)([^\x00-\x1F]+(\\|\/))*([^\x00-\x1F]+)/i.test(application)) {
    const ext = (platform === 'Mac' && 'app') || (platform === 'Windows' && 'exe') || false;
    if (application.split('.').pop().toLowerCase() !== ext) throw new Error('The application path or platform data is incorrect');
    return application;
  }
  // has app name
  const appsMap = getProduct.execSync();

  if (!appsMap[application]) throw new Error(`Application name ${ application } not found may be [${ Object.keys(appsMap) }]`);
  return appsMap[application];
}

// get platform script
const RunExec = (function () {
  if (platform === 'Windows') {
    return require('./core/win.js');
  } else if (platform === 'Mac') {
    return require('./core/mac.js');
  } else {
    throw new Error('please use on Windows and Mac');
  }
})();

function ExtendScript(scripts) {
  if ([null, undefined].includes(scripts)) throw new Error('scripts cannot be empty');
  if (typeof scripts !== 'string') throw new Error('scripts are not string');
  if (!scripts) throw new Error('scripts cannot be an empty string');

  const { minify, includes, application } = module.exports;
  const opt = {
    minify,
    includes,
    runName: '',
    resultName: '',
    tempIncludes: [],
    scripts: scripts.trim(),
    application: handlesApplication(application),
    tempDir: path.resolve(os.tmpdir(), 'Adobe-ExtendScript'),
  };
  // create mkdir temp
  if (!fs.existsSync(opt.tempDir)) fs.mkdirSync(opt.tempDir);
  // start script
  return new Promise((resolve, reject) => {
    result.handlerOptions(opt);
    RunExec(opt).then(() => {
      return result.getResult(opt);
    }).then(resolve).catch(reject);
  });
};

// 简单赋值
module.exports = ExtendScript;
module.exports.minify = true; // 压缩
module.exports.includes = [
  path.resolve(__dirname, './includes/es5-shim.min.js'),
  path.resolve(__dirname, './includes/json2.min.js'),
]; // 引入绝对路径
module.exports.application = ''; // 程序名称
module.exports.getProduct = getProduct;
// 不可添加
Object.preventExtensions(module.exports);
