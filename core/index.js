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

function handlerMinifyFunc(script) {
  const options = { sourceMap: false, mangle: false, compress: { conditionals: false } };
  return uglify.minify(script, options).code;
}

module.exports = {
  handlerOptions(opt) {
    const resultName = getUUID('Result-xxx-xxx4-xx4x.js');
    opt.resultName = path.resolve(opt.tempDir, resultName);
    opt.runName = getUUID('Run-xxx-xxx4-xx4x');

    const includes = [];
    opt.tempIncludes = opt.includes.reduce(function (value, paths) {
      const content = fs.readFileSync(paths, { encoding: 'utf8' });
      const newPath = path.resolve(opt.tempDir, getUUID('xxxxxxxx.js'));
      fs.writeFileSync(newPath, opt.minify ? handlerMinifyFunc(content) : content, { encoding: 'utf8' });
      includes.push(`$.evalFile("${ newPath }");`);
      return value.concat(newPath);
    }, []);

    const content = includes.concat(callbackStr.replace(/\$\{([^\}]+)\}/g, function (types) {
      if (types === '${temp}') return getTemp(opt.resultName);
      if (types === '${script}') return opt.scripts;
      return types;
    })).join('\r');

    opt.scripts = opt.minify ? handlerMinifyFunc(content) : content;
  },
  getResult(opt, timeout = 1000) {
    const data = 'Yes';
    // const data = require(opt.resultName);
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          for (const paths of opt.tempIncludes) {
            fs.unlinkSync(paths);
          }
          fs.unlinkSync(opt.resultName);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      }, timeout);
    });
  },
};
