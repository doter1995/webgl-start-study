# 关于矩阵处理平移，旋转，缩放

> 是由一对shader组成的着色器程序，属于强类型语言，该程序是运行在GPU上的。

## 简单的二维平移，旋转，缩放

### 二维平移

> 二维平移特别简单，只需要记录x，y轴的偏移量即可。

```javascript
var position = [1,2];
var translation = [2,4];
//则当前计算后位置为[3.6];
translation = [-2,-4];
//则当前计算后位置为[-1,-2];
```

### 二维旋转

> 旋转是个有趣的，旋转一圈是360°,我们暂时使用0-360来代表。
> 关于数学方面的理解，可参考sin和cos。
 简单来说,就是通过计算单位圆的上旋转后得点坐标，

### 二维缩放

> 纹理是一个数据序列,可以在程序运行期间随意读取其中的数据。通常存放的数据是图像。

### Varyings 可变量

> 在顶点shader中赋值传递给片段shader。通过这种方式向片段shader传值  

## GLSL的着色器

> GLSL有两个shader,分别是顶点shader和片段shader

### 顶点shader

> 用于计算顶点在显示的位置
顶点shader先被执行，通过Uniforms,Attribute,Buffer和Texture这些数据进行计算点位置gl_Position。当需要传值给片段Shader时，需要声明Varyings,并且为其赋值，在片段Shader中使用。

### 片段shader

> 用于计算颜色值gl_FragColor,实现自定义像素点颜色。
