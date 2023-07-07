# Adobe-ExtendScript

> `语言` [中文](./README.md)

`Adobe` software `ExtendScript` script debugging,
theoretically support `Adobe` platform all software debugging.

### support Test

> success`✅`，error`❎`，untested `❗`。
> Because not all software is installed, it is not added to the table below.

|     app     | Windows | Mac |
|:-----------:|:-------:|:---:|
|  Photoshop  |    ✅    |  ✅  |
| Illustrator |    ✅    |  ✅  |

### argument

|    name     |     type      |            default             |                                                       explain                                                       |
|:-----------:|:-------------:|:------------------------------:|:-------------------------------------------------------------------------------------------------------------------:|
|   minify    |    Boolean    |              true              |                                                   Compressed code                                                   |
| application |    String     |              null              | Mandatory, Application name or Application path <br/> Application name Ensure that the registry can obtain the path |
|  includes   | Array\<Paths> | [es5-shim.min.js,json2.min.js] |                                       Absolute path array, import script file                                       |

### function

|        name         | argument |           explain            |
|:-------------------:|:--------:|:----------------------------:|
|   getProduct.exec   |   null   | `mdfind` quickly finds files |     
| getProduct.execSync |   null   | `mdfind` quickly finds files |

### example

```JavaScript
const ExtendScript = require('./index.js');

// console.log(getProduct.execSync());
getProduct.exec().then(data => {
  console.log(data);
});

// [es5-shim.min.js,json2.min.js]
ExtendScript.includes = [
  path.resolve(__dirname, './includes/es5-shim.min.js'),
  path.resolve(__dirname, './includes/json2.min.js'),
];

ExtendScript.minify = false;

// The application name must be - all lowercase
ExtendScript.application = 'Photoshop'.toLowerCase();
// ExtendScript.application = 'Illustrator'.toLowerCase();
// ExtendScript.application = 'Premiere Pro'.toLowerCase();

// Please enter the absolute path
// ExtendScript.application = '/Applications/Adobe/Adobe Photoshop 2023/Adobe Photoshop 2023.app';

ExtendScript('app.name').then(data => {
  console.log('ExtendScript', data);
});
```
