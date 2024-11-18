# rollup配置

## 初始化项目

```js
npm init -y
```

## 安装依赖

* @babel/preset-env
* @babel/core
* rollup
* rollup-plugin-babel
* rollup-plugin-serve -D

```JS
npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve -D
```

## 打包文件的配置

创建rollup.config.js
```js
import bable from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"
export default{
    input:'./src/index.js',//打包的入口文件
    output:{
        file:'dist/vue.js',
        format:'umd',//打包的模块，可以在window上 Vue
        name:'vue',//全局的Vue
        sourcemap:true,//映射
    },
    plugins:[
        bable({
            exclude:'node_modules/**',//排除不需要转化
        }),
        serve({
            port:3000,//设置端口号
            contentBase:'',//如果是''表示当前目录
            openPage:'/index.html',//打开的文件
        })
    ]
}
```

## 执行命令

```json
{
  "name": "vue2-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "rollup -c -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.22.20",
    "rollup": "^2.56.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-serve": "^2.0.2"
  }
}
```

rollup.js2.56.0

## babela预解析

创建.babelrc
```js
{
    "presets":[
        "@babel/preset-env"
    ]
}
```

## 页面使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./dist/vue.js"></script>
    <script>
        const vm=new Vue({
            data(){
                return{
                    
                }
            }
        })
        console.log(vm)
    </script>
</body>
</html>
```