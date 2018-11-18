let gl
let width = window.innerWidth;
//由于页面高度并不是100%所以。。。
let height = window.innerHeight * 9 / 10;
const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 colorValue;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;
void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = colorValue;
}
`;

const fsSource = `
varying lowp vec4 vColor;
void main() {
  gl_FragColor = vColor;
}
`;

function createShader(gl, type, source) {
  //创建着色器
  let shader = gl.createShader(type);
  //将着色器源码发送发到着色器
  gl.shaderSource(shader, source);
  //编译着色器
  gl.compileShader(shader);
  //查询是否编译成功
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl) {
  //创建着色器
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //创建shader Program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    return shaderProgram;
  }
  gl.deleteProgram(shaderProgram);
  console.error("create Program is error");
}

function drawScene(gl, programInfo) {
  // gl.viewport(0,0,width,height); 
  //计算矩阵转换
  let projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix,
    45,
    width / height,
    0.1,
    200.0);
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]);

  //指定定点参数及数据格式
  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 3; // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  // 每次迭代运行运动多少内存到下一个数据开始点
  var offset = 0; // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition, size, type, normalize, stride, offset)
  //启用定点参数
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  gl.vertexAttribPointer(programInfo.attribLocations.colorValue, 3, type, normalize, stride, offset)
  gl.enableVertexAttribArray(programInfo.attribLocations.colorValue);
  //设置shader程序
  gl.useProgram(programInfo.program);
  //指定一个uniform矩阵变量
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);
  //指定绘制
  var primitiveType = gl.TRIANGLE_STRIP;
  var offset = 0; //数据偏移
  var count = 4; //几个数据
  gl.drawArrays(primitiveType, offset, count);
}

//构建buffer
function initBuffer() {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  var vertices = [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  return buffer;
}
//构建颜色Buffer
function initColorBuffer() {
  let colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  var colors = [
    1.0, .9, 1.0, 1.0, // 白色
    1.0, 0.0, 0.0, 1.0, // 红色
    0.0, 1.0, 0.0, 1.0, // 绿色
    0.0, 0.0, 1.0, 1.0 // 蓝色
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return colorBuffer;
}


function mian() {
  let canvas = document.querySelector("#webgl");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const shaderProgram = createProgram(gl);
  //简单的封装便于使用
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      colorValue: gl.getAttribLocation(shaderProgram, "colorValue")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  //设置视角比例
  let buffer = initBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let colorBuffer = initColorBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  drawScene(gl, programInfo);
}

mian();