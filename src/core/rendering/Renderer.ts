import { FRAGMENT_SHADER } from "./fragment.shader";
import { VERTEX_SHADER } from "./vertex.shader";
import { createProgram } from "./webgl2.utils";

export default class Renderer {
  private program: WebGLProgram;

  public constructor(private gl: WebGL2RenderingContext) {
    this.program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  }

  public init() {
    this.gl.useProgram(this.program);
  }

  public draw() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}
