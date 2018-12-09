# GLSL

> 是由一对shader组成的着色器程序，属于强类型语言，该程序是运行在GPU上的。

## GLSL常见数据

### Buffer And Attribute

> Buffer 用于存储位置，顶点颜色，法向向量，纹理坐标等数据。
> Attribute 用于制定如何从Buffer中获取数据。

### Uniforms 全局变量

> 在着色器运行前赋值，运行期间有效。

### Textures 纹理

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
