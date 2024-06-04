export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShaderSrc: string,
  fragmentShaderSrc: string
) {
  const program = gl.createProgram();

  if (program === null) {
    throw new Error("Could not create WebGL2 program");
  }

  const vertexShader = createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
  const fragmentShader = createShader(
    gl,
    fragmentShaderSrc,
    gl.FRAGMENT_SHADER
  );

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    throw new Error("Failed to link program: " + gl.getProgramInfoLog(program));
  }

  return program;
}

export function createShader(
  gl: WebGL2RenderingContext,
  shaderSrc: string,
  shaderType: number
): WebGLShader {
  const shader = gl.createShader(shaderType);

  if (shader === null) {
    throw new Error("Failed to create vertex shader");
  }

  gl.shaderSource(shader, shaderSrc);

  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    throw new Error("Could not compile shader: " + gl.getShaderInfoLog(shader));
  }
  return shader;
}
