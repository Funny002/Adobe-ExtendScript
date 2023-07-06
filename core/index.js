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

const callbackStr = '(function(){var result={status:true,data:"",error:""};try{result.data=${script};}catch(e){result.status=false;result.error=e.message}var file=File(${temp});file.open();file.write("module.exports={status:"+result.status+",data:"+result.data+",error:"+result.error+"}");file.close()})()';

function getTemp(result) {
  if (platform === 'Windows') {
    return `Folder.temp.absoluteURI+ "/${ result }"`;
  } else if (platform === 'Mac') {
    return `"${ path.resolve(os.tmpdir(), result) }"`;
  } else {
    throw new Error('please use on Windows and Mac');
  }
}

function getHeaderScript(includes) {
  return '';
}

function handlerMinifyFunc(script) {
  const options = { fromString: true, compress: { conditionals: false } };
  return uglify.minify(script, options).code;
}

module.exports = {
  create(options) {
    options.resultName = getUUID('ExtendScript-Result-xxx-xxx4-xx4x.js');
    const { resultName, minify, includes, scripts } = options;

    // 组合
    let content = getHeaderScript(includes) + '\r' + callbackStr.replace(/\$\{([^\}]+)\}/g, function (types) {
      if (types === '${temp}') return getTemp(resultName);
      if (types === '${script}') return scripts;
      return types;
    });

    // 压缩
    if (minify) content = handlerMinifyFunc(content);

    // return new Promise((resolve, reject) => {
    //   console.log(scriptStr, options);
    //   resolve(true);
    // });
  },
  getResult({ resultName }, timeout = 1000) {
    const paths = path.resolve(os.tmpdir(), resultName);
    return new Promise(function (resolve, reject) {
      const data = require(paths);
      setTimeout(() => {
        fs.unlink(paths, function (err) {
          if (err) reject(err);
        });
        resolve(data);
      }, timeout);
    });
  },
};
