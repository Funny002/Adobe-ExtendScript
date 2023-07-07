/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const ExtendScript = require('./index.js');

ExtendScript.minify = false;
ExtendScript.application = 'Illustrator'.toLowerCase();
// ExtendScript.application = '/Applications/Adobe/Adobe Photoshop 2023/Adobe Photoshop 2023.app';
ExtendScript('app.name').then(data => {
  console.log('ExtendScript', data);
});
