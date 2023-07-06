/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const getProduct = require('./lib/getProduct');
const result = require('./core/index.js');
const path = require('path');

module.exports = function (scripts) {
  if ([null, undefined].includes(scripts)) throw new Error('scripts cannot be empty');
  if (typeof scripts !== 'string') throw new Error('scripts are not string');
  if (!scripts) throw new Error('scripts cannot be an empty string');

  const { minify, includes, application } = module.exports;
  const options = { minify, includes, application, resultName: '', scripts: scripts.trim() };

  return new Promise((resolve, reject) => {
    result.create(options).then((result) => {
      console.log('result');
    });

    result.getResult(options).then(resolve).catch(reject);
  });
};

// 简单赋值
module.exports.minify = true; // 压缩
module.exports.includes = [
  path.resolve(__dirname, './includes/es5-shim.js'),
  path.resolve(__dirname, './includes/json2.js'),
]; // 引入绝对路径
module.exports.application = ''; // 程序名称
module.exports.getProduct = getProduct;
// 不可添加
Object.preventExtensions(module.exports);
