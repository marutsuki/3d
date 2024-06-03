import { FRAGMENT_SHADER } from "./fragment.shader";
import { VERTEX_SHADER } from "./vertex.shader";
import { createProgram } from "./webgl2.utils";

export default class Renderer {
  public constructor(private gl: WebGL2RenderingContext) {
    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    console.log("here is a program", program);
  }
}
