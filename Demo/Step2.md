# 加入颜色的shader

## 渲染思路

1. 创建canvas标签，获取webgl的context
2. 重置背景颜色。
3. 创建Program，并将vertexShader和fragmentShader添加到到context中
4. 创建视图的buffer,并绑定buffer
5. 创建颜色的buffer,并绑定colorBuffer
6. 设置顶点参数并启用
7. 设置color参数并启用
8. 设置Program
9. 设置shader中需要的Attrib和uniform值。
10. 给定绘制参数，并绘制。
