/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const ExtendScript = require('./index.js');

ExtendScript.application = 'photoshop';

ExtendScript(`alert('Text')`).then(data => {
  console.log('ExtendScript', data);
});
