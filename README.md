# Adobe-ExtendScript

> `Language` [English](./README-English.md) (Machine translation)

`Adobe` 软件 `ExtendScript` 脚本调试，理论支持`Adobe`平台全部软件调试。

### 测试支持

> 成功`✅`，失败`❎`，未测试`❗`。 因为没有安装全部软件，所以没有添加到下方表格中。
>

|     软件      | Windows | Mac |
|:-----------:|:-------:|:---:|
|  Photoshop  |    ✅    |  ✅  |
| Illustrator |    ✅    |  ✅  |

### 参数

|     名称      |      类型       |              默认数值              |                 说明                  |
|:-----------:|:-------------:|:------------------------------:|:-----------------------------------:|
|   minify    |    Boolean    |              true              |                压缩代码                 |
| application |    String     |              null              | 必填项，应用名称或应用路径<br/>应用名称请确定注册表可以获取到路径 |
|  includes   | Array\<Paths> | [es5-shim.min.js,json2.min.js] |            绝对路径数组，引入脚本文件            |

### 方法

|         名称          |  参数  |     说明      |
|:-------------------:|:----:|:-----------:|
|   getProduct.exec   | null | 从注册表中获取应用程序 |     
| getProduct.execSync | null | 从注册表中获取应用程序 |

### 示例

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

// 应用名称必须是 - 全小写格式
ExtendScript.application = 'Photoshop'.toLowerCase();
// ExtendScript.application = 'Illustrator'.toLowerCase();
// ExtendScript.application = 'Premiere Pro'.toLowerCase();

// 请输入绝对路径
// ExtendScript.application = '/Applications/Adobe/Adobe Photoshop 2023/Adobe Photoshop 2023.app';

ExtendScript('app.name').then(data => {
  console.log('ExtendScript', data);
});
```
