/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const {platform} = require('../utils/index.js');

import os from 'os';

const callbackStr = '(function(){var result={status:true,data:"",error:""};try{result.data=${name}(${args});}catch(e){result.status=false;result.error=e.message}var file=File(${temp});file.open();file.write("module.exports={status:"+result.status+",data:"+result.data+",error:"+result.error+"}");file.close()})()';

function getTemp(result) {
  if (platform === 'Windows') {
    return 'Folder.temp.absoluteURI+"/' + result + '.js"';
  } else if (platform === 'Mac') {
    return os.tmpdir() + '/' + result + '.js';
  } else {
    throw new Error('please use on Windows and Mac');
  }
}
