# 初始化

> Vue 2 的源码是一个功能丰富的体系，围绕响应式系统、模板编译、虚拟 DOM、组件化等核心功能构建

## Vue 初始化

Vue 的入口文件在 `src/core/index.js`，其核心是定义 Vue 构造函数，并添加全局 API 和原型方法：

```js
function Vue(options) {
  if (!(this instanceof Vue)) {
    console.warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}
```

**在构造函数中调用了 `_init` 方法，这是真正初始化的起点。**

### data初始化

```js
//index.js vue类定义
import {initMixin} from './init'
function Vue(options){
    this._init(options)
}
initMixin(Vue)

export default Vue
```

```js
//init.js初始化模块
import { initState } from "./initState";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm)
  };
}
```

```js
//initState.js 开始对data初始化
import { observer } from "./observer/index";
export function initState(vm) {
  let opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
}

//vue2对data初始化
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  //对数据进行劫持
  observer(data);
}
function initProps(vm) {}
function initMethods(vm) {}
function initComputed(vm) {}
function initWatch(vm) {}
```

```js
//observer/index.js 劫持数据
import { ArrayMethods } from "./arr";
export function observer(data) {
  //1.对象
  if (data == null || typeof data !== "object") {
    return data;
  }

  //2对象通过一个类
  return new Observer(data);
}
//vue2 Object.defineProperty 缺点：对象中的一个属性发生变化，需要重新定义这个属性
//vue3 proxy 缺点：对象中的一个属性发生变化，需要重新定义这个属性
class Observer {
  constructor(value) {
    //给data定义一个属性
    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      value: this,//？？？？？？？？？？？？
    });
    //判断数据
    //数组劫持
    //函数劫持重写数组方法
    if (Array.isArray(value)) {
      value.__proto__ = ArrayMethods;
      //如果是你是数组对象
      this.observeArray(value);
    } else {
      this.walk(value); //遍历
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    //对象我们的每个属性进行劫持
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observer(value[i]);
    }
  }
}
//对对象的属性进行劫持
//1.object.defineProperty有缺点 只能 对象中的一个属性进行劫持
//2.遍历{a:1,b:2,obj:{c:3}}
//3.递归 get set
function defineReactive(data, key, value) {
  observer(value); //递归？？？？？？
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observer(newValue); //如果用户设置的值是对象
      value = newValue;
    },
  });
}
```

```js
//observer/arr.js 重写数组
//1.获取原来数组的方法

let oldArrayProtoMethods = Array.prototype;
//创建一个新对象，原型指向oldArrayProto，再扩展新的方法不会影响原来数组的方法

//2.继承
export let ArrayMethods = Object.create(oldArrayProtoMethods);

//3.劫持数组的方法
let methods = ["push", "pop", "shift", "unshift", "splice"];
methods.forEach((item) => {
  //保存原来的方法
  ArrayMethods[item] = function (...args) {
    //？为什么要使用apply
    //调用原来的方法
    let result = oldArrayProtoMethods[item].apply(this, args);
    let inserted;
    //调用数组响应式的方法
    //问题：数组追加对象的情况
    //???????????????????
    switch (item) {
      case "push":
      case "unshift":
        //push和unshift添加的元素
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    let ob=this.__ob__;
    //对添加的对象进行劫持
    if (inserted) {
        ob.observeArray(inserted);
    }
    return result;
  };
});
```

### 将data上的所有的属性代理到实例上

```js
//initState.js
import { observer } from "./observer/index";
export function initState(vm) {
  let opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
}

//vue2对data初始化
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  //对数据进行劫持
  observer(data);
  //将data上的所有属性代理实例上
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
///????????????????
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}
function initProps(vm) {}
function initMethods(vm) {}
function initComputed(vm) {}
function initWatch(vm) {}
```