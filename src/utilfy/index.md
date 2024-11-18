## utilify 通用函数

### cts 解析html结构

#### extractHtmlComponents:解析文本

```JS
fetch(url)
      .then((response) => response.text())
      .then((data) => {
        let result = UtilClass.extractHtmlComponents(data);
        console.log(result)
   })
  .catch((error) => {
    console.error("Error fetching HTML:", error);
    err && err(error);
  });
/*
*cssContent: [],
*externalScripts: [],
*htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-*8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /use-easy-tools/index.html</pre>\n</body>\n</html>"
*inlineJsContent: [],
*/
```

#### extractHTMLContent:解析外部html

```JS
Utilify.extractHTMLContent({
    url: 'http://127.0.0.1:5500/use-easy-tools/index.html',
    type: "iframe",
    attributes: {
        width: "600",
        height: "400",
        sandbox: "allow-scripts allow-same-origin",
        title: "Example Iframe"
    },
    name: "shadow-dom",
    elMount: "#app"
})
```

| 属性       | 描述                             | 默认值     |
| ---------- | -------------------------------- | ---------- |
| url        | 解析html页面的地址               | -          |
| type       | 回显的类型                       | `'shadow'` |
| success    | 解析成功的回调                   | -          |
| err        | 解析失败的回调                   | -          |
| name       | 回显类型是‘shadow’，name是组件名 | -          |
| attributes | iframe的属性                     | -          |
| elMount    | append在那个节点下               | -          |

#### escapeHTML：转义html(防XSS攻击)

```JS
let data2 = Utilify.escapeHTML(`<div onclick="alert('XSS')">Click Me</div>`)
console.log(data2)//&lt;div onclick=&quot;alert(&#39;XSS&#39;)&quot;&gt;Click Me&lt;/div&gt;
```

#### elementIsVisibleInViewport：如何检查指定的元素在视口中是否可见

```JS
// HTML 结构
<div id="myElement">Hello, World!</div>

// 检查元素是否完全在视口中可见
const el = document.getElementById('myElement');
const isVisible = Utilify.elementIsVisibleInViewport(el);
console.log(isVisible); // 返回 true 或 false，取决于元素位置

// 检查元素是否部分在视口中可见
const isPartiallyVisible = Utilify.elementIsVisibleInViewport(el, true);
console.log(isPartiallyVisible); // 返回 true 或 false
```

| 属性   | 说明                                                         | 类型    |
| ------ | ------------------------------------------------------------ | ------- |
| 参数一 | 要检查的 DOM 元素。                                          | -       |
| 参数二 | 是否检查部分可见性。默认为 `false`，即元素需要完全在视口内才返回 `true`。如果设置为 `true`，则只要元素的任何部分在视口内，就返回 `true`。 | `false` |

#### getImages：如何获取元素中的所有图像

```HTML
<div id="imageContainer">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image1.jpg" />
</div>
```

```JS
// 获取元素
const container = document.getElementById('imageContainer');

// 获取不包含重复项的图像 src 数组
const uniqueImages = Utilify.getImages(container);
console.log(uniqueImages); // 输出 ["image1.jpg", "image2.jpg"]

// 获取包含重复项的图像 src 数组
const allImages = Utilify.getImages(container, true);
console.log(allImages); // 输出 ["image1.jpg", "image2.jpg", "image1.jpg"]
```

| 属性   | 说明                                                         | 默认值  |
| ------ | ------------------------------------------------------------ | ------- |
| 参数一 | 包含图片的 DOM 元素（例如 `document` 或特定的容器元素）。    | -       |
| 参数二 | 一个布尔值，决定是否包含重复的图像地址。默认值为 `false`，去除重复项。 | `false` |

### event 事件

#### debounce：防抖

```js
<script>
//等待两秒触发
function changeValue(e) {
    Utilify.debounce(() => {
        console.log(2000)
    }, 2000)
}
</script>
<input placeholder="请输入" onInput="changeValue(event)" />
```

| 属性   | 描述               | 默认值 |
| ------ | ------------------ | ------ |
| 参数一 | 执行的回调         | -      |
| 参数二 | 等待多少秒再次触发 | `800`  |

#### throttle：节流

```js
<script>
    //2秒以内只会触发一次
    function changeValue(e) {
        Utilify.throttle(() => {
            console.log(2000)
        }, 2000)
    }
</script>

<input placeholder="请输入" onInput="changeValue(event)" />
```

| 属性   | 描述                     | 默认值 |
| ------ | ------------------------ | ------ |
| 参数一 | 执行的回调               | -      |
| 参数二 | 在多少秒之后再次触发一次 | `800`  |

#### copy：复制

```JS
<script>
function copy(){
    Utilify.copy('复制')
}
</script>
<button onClick="copy()">复制</button>
```

### file 文件处理

#### fileToBase64String：获取文件base64编码

```HTML
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
      console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 描述                                                         | 默认值                          |
| ------ | ------------------------------------------------------------ | ------------------------------- |
| 参数一 | 要转换的文件对象（通常通过文件上传 `<input type="file" />` 元素获取）。 | -                               |
| 参数二 | 允许的文件格式列表，默认值为 `["jpg", "jpeg", "png", "gif"]` | `["jpg", "jpeg", "png", "gif"]` |
| 参数三 | 允许的文件大小上限（以字节为单位），默认值为 `20 * 1024 * 1024`（即 20MB）。 | `20 * 1024 * 1024`              |
| 参数四 | 当文件格式不正确时的提示信息，默认值为 `"文件格式不正确"`    | `"文件格式不正确"`              |
| 参数五 | 当文件大小超出限制时的提示信息，默认值为 `"文件大小超出限制"` | `"文件大小超出限制"`            |

#### base64ToFile：base64转file

```HTML
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
      let data = Utilify.base64ToFile(result.base64String, '截图')
      console.log(data)
      /**
      *lastModified: 1731573460470,
	  *lastModifiedDate: Thu Nov 14 2024 16:37:40 GMT+0800 (中国标准时间) {},
	  *name: "截图.png",
	  *size: 972,
	  *type: "image/png",
	  *webkitRelativePath: "",
      */
      console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | Base64 格式的字符串，通常带有 `data:image/png;base64,...` 这样的前缀。 | -      |
| 参数二 | 文件名，不包括文件后缀，后缀会根据 Base64 数据的 MIME 类型自动添加。 | -      |

#### base64ToBlob：base64转blob

```HTML
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
       let data = Utilify.base64ToBlob(result.base64String)
       console.log(data)
      /**
      *{
      * size: 972
	  * type: "image/png"
      *}
      */
      console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | Base64 编码的字符串，通常包含 MIME 类型前缀（如 `data:image/png;base64,...`）。 | -      |

#### blobToFile：blob转file

```JS
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
       let data = Utilify.base64ToBlob(result.base64String)
       let data2 = Utilify.blobToFile(data,'截图')
       console.log(data)
       console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | 一个包含 `Blob` 的数组（`[blob]`），因为 `File` 构造函数需要一个数组类型的参数。 | -      |
| 参数二 | 文件的名称（`fileName`）                                     | -      |

#### fileToBase64：file转base64

```HTML
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
       let data = Utilify.base64ToBlob(result.base64String)
       let data2 = Utilify.blobToFile(data,'截图')
       let data3 = await Utilify.fileToBase64(data2)
       console.log(data)
       console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | 文件对象（通常通过文件上传 `<input type="file" />` 元素获取）。 | -      |

#### formatFileSize：B转换到KB,MB,GB并保留两位小数

```HTML
<input type="file" id="fileInput" />
<button onclick="convertFile()">转换文件</button>
```

```JS
function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("请选择文件");
    return;
  }

  Utilify.fileToBase64String(file)
    .then((result) => {
      console.log("Base64 字符串：", result.base64String);
      let size = Utilify.formatFileSize(data.size)
      console.log(data,size)//'972B'
      console.log("文件格式：", result.suffix);
    })
    .catch((error) => {
      console.error("转换失败：", error);
    });
}
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | 文件大小，单位为字节（例如：文件对象的 `file.size` 属性值）。 | -      |

### qs 解析url

#### queryParams：获取地址栏参数

```js
//地址栏：http://127.0.0.1:5500/utilify/index.html?data=1
et data2 = Utilify.queryParams('data')
console.log(data2)//1
```

#### params2Url：键值对拼接成URL参数

```JS
console.log('www.baidu.com?' + Utilify.params2Url({ data: 2, value: 1 }))//www.baidu.com?data%3D2%26value%3D1
```

| 属性   | 默认值                          | 默认值 |
| ------ | ------------------------------- | ------ |
| 参数一 | 传入的参数是一个 **键值对对象** | -      |

### optimization：优化处理

#### tco：递归优化（尾递归）

```JS
// 递归的阶乘函数
const factorial = (n, accumulator = 1) => {
  if (n === 0) return accumulator;
  return factorial(n - 1, accumulator * n);
};

// 使用 UtilClass.tco 来优化尾调用
const optimizedFactorial = UtilClass.tco(factorial);

// 计算 5 的阶乘
console.log(optimizedFactorial(5)); // 输出: 120
```

### Data 数据处理

#### getRandomInt：生成随机数

```js
let data2 = Utilify.getRandomInt(10000)
console.log(data2)//1114
```

#### randomNum：随机生成几到几的随机数

```JS
console.log(Utilify.randomNum(1,10))//7
```

#### formatCurrency：数字格式化为货币格式

```JS
let data2 = Utilify.formatCurrency('1257822666324')
console.log(data2)//1,257,822,666,324
```

#### telFormat：手机号中间四位变成*

```JS
console.log(Utilify.telFormat('15328745328'))//153****5328
```

#### getKebabCase：驼峰命名转换成短横线命名

```JS
console.log(Utilify.getKebabCase('aBc'))//a-bc
```

#### getCamelCase：短横线命名转换成驼峰命名

```JS
console.log(Utilify.getCamelCase('a-bc'))//aBc
```

#### toChineseNumber：数字数字转成中文

```JS
let data2 = Utilify.toChineseNumber('12345877')
console.log(data2)//一千二百三十四万五千八百七十七
```

#### digitUppercase：数字转化为大写金额

```JS
console.log(Utilify.digitUppercase('15878555222'))//壹佰伍拾捌亿柒仟捌佰伍拾伍万伍仟贰佰贰拾贰元整
```

#### trim：去除空格

```JS
// 去除所有空格
let str1 = "  Hello World  ";
let result1 = Utilify.trim(str1, 1);  // "HelloWorld"
console.log(result1);

// 去除前后空格
let str2 = "  Hello World  ";
let result2 = Utilify.trim(str2, 2);  // "Hello World"
console.log(result2);

// 去除前面空格
let str3 = "  Hello World";
let result3 = Utilify.trim(str3, 3);  // "Hello World"
console.log(result3);

// 去除后面空格
let str4 = "Hello World  ";
let result4 = Utilify.trim(str4, 4);  // "Hello World"
console.log(result4);

```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | 待处理的字符串。                                             | -      |
| 参数二 | 去除空格的类型，默认为 `1`，表示去除所有空格（`1`：去除所有空格，`2`：去除字符串两端的空格，`3`：去除字符串前面的空格，`4`：去除字符串后面的空格） | `1`    |

### cookie cookie处理

#### setCookie：操作cookie

```JS
// 设置一个名为 "user" 的 cookie，值为 "JohnDoe"，并设置过期时间为 7 天
Utilify.setCookie('user', 'JohnDoe', 7);

// 设置一个名为 "theme" 的 cookie，值为 "dark"，并设置过期时间为 30 天
Utilify.setCookie('theme', 'dark', 30);
```

| 属性   | 说明                                                         | 默认值 |
| ------ | ------------------------------------------------------------ | ------ |
| 参数一 | 指定要存储的 cookie 名称（比如 "user"、"theme"）             | -      |
| 参数二 | 指定 cookie 对应的值（比如 "JohnDoe"、"dark"）               | -      |
| 参数三 | 指定 cookie 的过期天数。如果你设置了 `expire`，cookie 会在设置的天数后过期。如果没有设置，cookie 默认会在浏览器关闭时过期（会话 cookie） | -      |

#### getCookie：读取cookie

```JS
// 获取名为 "user" 的 cookie 值
let user = Utilify.getCookie('user');
console.log(user);  // 如果存在名为 "user" 的 cookie，将打印其值，如果不存在，则打印空字符串

// 获取名为 "theme" 的 cookie 值
let theme = Utilify.getCookie('theme');
console.log(theme);  // 如果存在名为 "theme" 的 cookie，将打印其值，如果不存在，则打印空字符串

```

| 属性   | 说明                | 默认值 |
| ------ | ------------------- | ------ |
| 参数一 | cookie 的键（名称） | -      |

#### delCookie：删除cookie

```JS
// 删除名为 "user" 的 cookie
Utilify.delCookie('user');

// 删除名为 "theme" 的 cookie
Utilify.delCookie('theme');
```

| 属性   | 说明                         | 默认值 |
| ------ | ---------------------------- | ------ |
| 参数一 | 要删除的 cookie 的键（名称） | -      |

### tree 树形处理

#### flattenTree：数据的拍平

```JS
// 定义常见的中文姓氏和名字
const surnames = ["张", "李", "王", "赵", "刘", "陈", "杨", "黄", "吴", "周", "徐", "孙", "马", "朱", "胡", "林", "郭", "何", "高", "梁"];
const firstNames = ["伟", "芳", "敏", "静", "杰", "磊", "燕", "丽", "强", "军", "鹏", "霞", "丽丽", "建国", "婷", "莉", "彬", "宇", "欢", "媛"];

// 随机生成一个姓名的函数
function generateRandomName() {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return surname + firstName;
}
function parseTemplate(id, name, cb) {
    return {
        [!cb ? 'pid' : 'id']: id,
        name,
        children: cb ? cb(this) : []
    }
}
function parseTree(num) {
    let result = []
    for (let i = 0; i < num; i++) {
        result[i] = parseTemplate(i, generateRandomName(), () => {
            let childrenData = []
            for (let j = 0; j < 10; j++) {
                childrenData.push({ id: i + '-' + j, ...parseTemplate(i, generateRandomName()) })
            }
            return childrenData;
        })
    }
    return result
}
let data1 = parseTree(1000)
console.log(data1)
/*
*
[
    {
    	children:  [
    		{
                children: []
                id: "0-0"
                name: "杨彬"
                pid: 0
    		}
    		...
    	]
    	id: 0
    	name: "胡建国"
    }
    ....
]
*/
let data = await Utilify.flattenTree(data1, 'children', false)
console.log(data)
/**
[
    {
    	children:  []
    	id: 0
    	name: "胡建国"
    }
    {
        children: []
        id: "0-0"
        name: "杨彬"
        pid: 0
    },
    ....
]
*/
```

| 属性   | 描述                                                  | 默认值       |
| ------ | ----------------------------------------------------- | ------------ |
| 参数一 | 需要拍平的数据                                        | -            |
| 参数二 | 需要拍平的二层数组字段                                | `'children'` |
| 参数三 | 拍平是否需要把二层数组重置，true是不重置，false是重置 | `true`       |

#### buildTreeStructure：构建树形结构

```JS
// 定义常见的中文姓氏和名字
const surnames = ["张", "李", "王", "赵", "刘", "陈", "杨", "黄", "吴", "周", "徐", "孙", "马", "朱", "胡", "林", "郭", "何", "高", "梁"];
const firstNames = ["伟", "芳", "敏", "静", "杰", "磊", "燕", "丽", "强", "军", "鹏", "霞", "丽丽", "建国", "婷", "莉", "彬", "宇", "欢", "媛"];

// 随机生成一个姓名的函数
function generateRandomName() {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return surname + firstName;
}
function parseTemplate(id, name, cb) {
    return {
        [!cb ? 'pid' : 'id']: id,
        name,
        children: cb ? cb(this) : []
    }
}
function parseTree(num) {
    let result = []
    for (let i = 0; i < num; i++) {
        result[i] = parseTemplate(i, generateRandomName(), () => {
            let childrenData = []
            for (let j = 0; j < 10; j++) {
                childrenData.push({ id: i + '-' + j, ...parseTemplate(i, generateRandomName()) })
            }
            return childrenData;
        })
    }
    return result
}
let data1 = parseTree(1000)
let data = await Utilify.flattenTree(data1, 'children', false)
let data2 = Utilify.buildTreeStructure(data)
console.log(data2)
/*
*
[
    {
    	children:  [
    		{
                children: []
                id: "0-0"
                name: "杨彬"
                pid: 0
    		}
    		...
    	]
    	id: 0
    	name: "胡建国"
    }
    ....
]
*/
```

| 属性      | 描述               | 默认值       |
| --------- | ------------------ | ------------ |
| flatData  | 需要构建树形的数据 | -            |
| idKey     | 关联子集字段       | `'id'`       |
| parentKey | 关联父集字段       | `'pid'`      |
| childKey  | 构建二层数组字段   | `'children'` |

#### foreachTree：遍历树节点

```JS
const treeData = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      { id: 2, name: 'Node 1.1' },
      { id: 3, name: 'Node 1.2', children: [{ id: 4, name: 'Node 1.2.1' }] }
    ]
  },
  {
    id: 5,
    name: 'Node 2'
  }
];
UtilClass.foreachTree(treeData, 'children', (node) => {
  console.log(node.name);
});
/*
*Node 1
*Node 1.1
*Node 1.2
*Node 1.2.1
*Node 2
*/
```

| 属性   | 说明                                                         | 默认值       |
| ------ | ------------------------------------------------------------ | ------------ |
| 参数一 | 要遍历的树形数据。通常是一个数组，其中每个元素表示树的一个节点。 | -            |
| 参数二 | 可选参数，指定子节点的名称。默认为 `"children"`，即每个节点的子节点存储在 `children` 属性中。 | `'children'` |
| 参数三 | 每个节点都会传入此函数，通常用于处理或操作节点的数据。       | -            |

### request 请求

#### tryAgain：重试请求

```JS
Utilify.tryAgain("https://api.example.com/data", 3)
```

#### concurRequest：并发请求

```JS
const urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3",
    "https://api.example.com/data4",
];

Utilify.concurRequest(urls, 3)
    .then((result) => {
        console.log("All requests completed:", result);
    })
    .catch((error) => {
        console.error("Error in concurRequest:", error);
    });
```

| 属性   | 描述                   | 默认值 |
| ------ | ---------------------- | ------ |
| 参数一 | 需要合并请求的地址集合 | -      |
| 参数二 | 多个请求一起请求       | `3`    |

### scroll：滚动处理

#### scrollToElem：滚动指定节点

```JS
<script>
function scrollToEle() {
    Utilify.scrollToElem(document.querySelector(".index5"),2000) 
}
</script>
<button onClick="scrollToEle(event)">滚动</button>
```

| 属性   | 描述                  | 默认值 |
| ------ | --------------------- | ------ |
| 参数一 | 指定滚到目标元素      | -      |
| 参数二 | 滚到花费的时间,单位ms | `500`  |
| 参数三 | 偏移量                | `0`    |

#### scrollToTop：滚动到页面顶部

```JS
<button onClick="scrolltop()">滚到顶部</button>
function scrolltop(){
    Utilify.scrollToTop()
}
```

#### scrollToBottom：滚动到页面底部

```JS
<button onClick="scrollBottom()">滚到底部</button>
function scrollBottom(){
    Utilify.scrollToBottom()
}
```

### verify：校验和检验

#### isNumeric：判断是否为数字

```JS
let data2 = Utilify.isNumeric('23456')
console.log(data2)//true
```

#### checkCardNo：校验身份证号码

```JS
console.log(Utilify.checkCardNo(362503199811146053))//true
```

#### isPostCode：校验是否为中国大陆的邮政编码

```JS
console.log(Utilify.isPostCode(344100))//true
```

#### isIPv6：校验是否为IPv6地址

```JS
console.log(Utilify.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")); // true
console.log(Utilify.isIPv6("::1")); // true
console.log(Utilify.isIPv6("1234::5678")); // true
console.log(Utilify.isIPv6("192.168.1.1")); // false (这是 IPv4 地址)
console.log(Utilify.isIPv6("invalid:ipv6:address")); // false
```

#### isEmail：校验是否为邮箱地址

```JS
console.log(Utilify.isEmail("example@test.com")); // true
console.log(Utilify.isEmail("user.name+tag+sorting@example.com")); // true
console.log(Utilify.isEmail("user@subdomain.example.com")); // true
console.log(Utilify.isEmail("invalid-email.com")); // false
console.log(Utilify.isEmail("user@domain@domain.com")); // false
```

#### isTel：校验是否为中国大陆手机号

```JS
console.log(Utilify.isTel(15324569871))//true
```

#### isEmojiCharacter：校验是否包含emoji表情

```JS
console.log(Utilify.isEmojiCharacter('😊'))//true
```

#### outOsName：Windows根据详细版本号判断当前系统名称

```js
console.log(UtilClass.outOsName("5.1.2600")); // "Win XP"
console.log(UtilClass.outOsName("6.1.7601")); // "Win 7"
console.log(UtilClass.outOsName("10.0.19042")); // "Win 10"
console.log(UtilClass.outOsName("7.0")); // "Win" (无法识别的版本)
console.log(UtilClass.outOsName("")); // undefined (无输入)
```

#### isMobile：判断是移动还是PC设备

```js
console.log(Utilify.isMobile())//desktop
```

#### isAppleMobileDevice：判断是否是苹果还是安卓移动设备

```js
if (UtilClass.isAppleMobileDevice()) {
  console.log("当前设备为 Apple 移动设备");
} else {
  console.log("当前设备不是 Apple 移动设备");
}
```

#### isAndroidMobileDevice：判断是否是安卓移动设备

```js
console.log(Utilify.isAndroidMobileDevice())//false
```

#### osType：判断是Windows还是Mac系统

```js
console.log(Utilify.osType())//windows
```

#### broswer：判断是否是微信/QQ内置浏览器

```js
const browser = UtilClass.broswer();

if (browser === "weixin") {
  console.log("当前浏览器是微信");
} else if (browser === "QQ") {
  console.log("当前浏览器是 QQ");
} else {
  console.log("当前浏览器不是微信或 QQ");
}

```

#### getExplorerInfo：浏览器型号和版本

```js
console.log(Utilify.getExplorerInfo())//{type: "Chrome",version: 130}
```

#### getType：数据类型判断

```js
console.log(Utilify.getType(123))//number
```

#### isColor16：验证16进制颜色

```js
console.log(Utilify.isColor16('#780607'))//true
```

#### isChineseName：验证中文姓名

```js
console.log(Utilify.isChineseName('jack'))
```

#### isExternal：判读是否为外链

```js
console.log(Utilify.isExternal('../watermark/watermark.js'))//false
```

#### isAlphabets：判断是否是大写字母开头

```js
console.log(Utilify.isAlphabets('Abc'))//true
```

#### iEVersion：判断IE浏览器版本和检测是否为非IE浏览器

```js
console.log(Utilify.iEVersion())//-1
```

### color

#### hexColor：随机16进制颜色 hexColor

```JS
console.log(Utilify.hexColor())//#07DC2D
```

#### randomHexColorCode：随机16进制颜色

```JS
console.log(Utilify.randomHexColorCode())//#780607
```

### screen：屏幕处理

#### toFullScreen：打开浏览器全屏

```JS
<button onClick="fullScreen()">全屏</button>
function cancelScreen(){
    Utilify.exitFullscreen()
}
```

#### exitFullscreen：退出浏览器全屏

```JS
<button onClick="cancelScreen()">退出全屏</button>
 function cancelScreen(){
    Utilify.exitFullscreen()
}
```

#### openWindow：打开一个窗口

```HTML
<button onClick="windowOn()">打开新窗口</button>
```

```JS
<script>
function windowOn(){
    Utilify.openWindow('http://127.0.0.1:5500/utilify/index.html','新窗口',500,500)
}
</script>
```

| 属性       | 说明                             | 默认值 |
| ---------- | -------------------------------- | ------ |
| url        | 要打开页面的 URL                 | -      |
| windowName | 窗口名称（用于重复打开同一窗口） | -      |
| width      | 窗口宽度                         | -      |
| height     | 窗口高度                         | -      |



### spreed：excel

### svg：水印

> 可参考watermark水印
