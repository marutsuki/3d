import { mat4 } from "gl-matrix";
import { Mesh } from "../../mesh/types";
import Batcher from "../batching/Batcher";
import { ModelViewProjection } from "./MVP";
import { FRAGMENT_SHADER } from "./fragment.shader";
import { VERTEX_SHADER } from "./vertex.shader";
import { createProgram } from "./webgl2.utils";

export default class Renderer {
  private program: WebGLProgram;

  private batcher: Batcher;

  public constructor(private gl: WebGL2RenderingContext) {
    this.program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    this.batcher = new Batcher(gl, this.program);
  }

  public init() {
    this.gl.useProgram(this.program);
    this.gl.enable(this.gl.DEPTH_TEST);
  }

  public add(mesh: Mesh) {
    this.batcher.add(mesh);
  }

  public draw() {
    const model = mat4.create();
    const view = mat4.create();
    const projection = mat4.create();

    mat4.lookAt(view, [-1, 1, -3], [5, 5, 5], [0, 1, 0]);
    mat4.perspective(
      projection,
      Math.PI / 4,
      this.gl.canvas.width / this.gl.canvas.height,
      0.1,
      200000
    );

    const mvp: ModelViewProjection = {
      model,
      view,
      projection,
    };
    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.program, "model"),
      false,
      model
    );
    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.program, "view"),
      false,
      view
    );
    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.program, "projection"),
      false,
      projection
    );
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.batcher.draw();
  }
}
