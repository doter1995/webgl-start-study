
# webGL基础操作

## 获取webgl对象

通过getContext(version,con)获取webgl上下文，其中第一个参数设置版本，第二个参数设置当前contextAttributes。

- webgl/webgl2 指定使用1/2版本

```javascript
let canvas = document.querySelector("#webgl");
let gl = canvas.getContext("webgl");
```

## 关于1/2版本

由于目前浏览器对webgl2.0已经开始支持。所以建议优先学习2.0.
