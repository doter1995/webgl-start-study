let gl
const vsSource = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function mian() {
  let canvas = document.querySelector("#webgl");
  gl = canvas.getContext("webgl");
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  console.log("this code is running")
  //创建着色器
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //创建shader Program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.isProgram(shaderProgram)) {
    console.error("this shader Program have mistake");
  }
  //简单的封装便于使用
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  //设置视角比例
  let buffer = initBuffer();
  drawScene(gl, programInfo, buffer);


}

function drawScene(gl, programInfo, buffer) {

  //清除颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //计算矩阵转换
  let projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix,
    45,
    640.0 / 480.0,
    0.1,
    100.0);
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);
    console.log("a")
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
mian();