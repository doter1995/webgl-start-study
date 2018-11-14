# webGL常见的类

> webGL的WebGLRenderingContext中的方法几乎涵盖了所有的操作，所以以下的类多数属于概念性，并不会有什么操作。

## WebGLRenderingContext

 基于 OpenGL ES 2.0 的绘图上下文

## WebGLProgram

由两个WebGLShader组成，分别是vertexShader和fragmentShader构成。
负责将两个着色器链接到webgl上。

## WebGLBuffer

缓冲区

## WebGLShader

vertexShader和fragmentShader

## WebGLUniformLocation

## WebGLTexture

纹理材质

### WebGLRenderingContext常用的方法

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |

#### Setting and getting state
| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |

#### buffer

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |
|WebGLBuffer|createBuffer()|创建一个buffer|1|
|void|bufferData(GLenum target, GLsizeiptr size, GLenum usage)|设置初始值为0的对应size的bufferData到target|1|
|void|bufferData(GLenum target, [AllowShared] BufferSource? data, GLenum usage)|将data设置到对应target|1|
||void bufferSubData(GLenum target, GLintptr offset, [AllowShared] BufferSource data)||1|
|void|bindBuffer(GLenum target, WebGLBuffer? buffer)|将buffer按照制定的类型绑定|1/2|
|void|deleteBuffer(WebGLBuffer? buffer)|删除指定buffer|1|
|void|isBuffer(WebGLBuffer? buffer)|检查是否为当前gl生成的buffer|1|

#### Framebuffer

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |
|WebGLFramebuffer|createFramebuffer()||1|
|void|bindFramebuffer(GLenum target, WebGLFramebuffer? framebuffer)||1/2|
|GLenum|checkFramebufferStatus(GLenum target)|检查其状态|1|
|void|deleteFramebuffer(WebGLFramebuffer? buffer)|删除Framebuffer|1|

#### Renderbuffer

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |
|WebGLRenderbuffer|createRenderbuffer()||1|

#### query

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |
|WebGLQuery| createQuery()|创建查询体|2|
|void|deleteQuery(WebGLQuery？query)|删除查询体|2|
|GLboolean|isQuery(WebGLQuery？query)|检查是否为当前gl生成的query|2|
|void|beginQuery(GLenum target,WebGLQuery query)|开始异步查询|2|
|void|endQuery(GLenum target)|结束查询|2|
|WebGLQuery|getQuery(GLenum target，GLenum pname)|获取查询|2|
|any|getQueryParameter(WebGLQuery query，GLenum pname)|获取查询参数|2|

#### ShaderProgram

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |
|void|reateProgram()| 创建一个Shader Program|1|
|void|deleteProgram(WebGLProgram? program)|删除指定的program|1|
|string|getProgramInfoLog(WebGLProgram program)|获取信息日志|1|
|void|linkProgram(WebGLProgram program)|链接program到gl|1|
|void|useProgram(WebGLProgram? program)|使用program|1|
|void|validateProgram(WebGLProgram program)|验证program|1|
|bool|isProgram(WebGLProgram? program)|检查是否为当前gl生成的program|1|
---------------------

#### Shader

| 返回 | 方法        | 功能    |  版本  |
| ---| :--------  | -----   | :----: |

#### Uniforms and attributes
#### Texture objects
#### Writing to the drawing buffer
#### Reading back pixels