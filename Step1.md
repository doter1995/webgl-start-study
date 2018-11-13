# 最简单的shader

## 简单WebGL的渲染思路

1. 创建canvas标签，获取webgl的context
2. 重置背景颜色。
3. 创建Program，并将vertexShader和fragmentShader添加到到context中
4. 创建视图的buffer,并绑定buffer
5. 设置顶点参数并启用
6. 设置Program
7. 设置shader中需要的Attrib和uniform值。
8. 给定绘制参数，并绘制。
> ⚠️这只是简单的shader，暂时并没有涉及到相机,更新等等问题

## openGL ES Shading Language (GLSL) 着色器程序

> 此处暂时跳过，后期补充链接。

## 关于矩阵转换

> 此处暂时跳过，后期补充链接。
