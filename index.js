/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const getProduct = require('./lib/getProduct');

const options = {
  application: '', // 应用程序
  includes: [], // 引入
  minify: false, // 压缩
};

module.exports = function () {
  console.log(options);
};

// 简单赋值
module.exports.options = options;
module.exports.getProduct = getProduct;
// 不可添加
Object.preventExtensions(module.exports);
Object.preventExtensions(module.exports.options);
