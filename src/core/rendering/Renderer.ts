import { mat4 } from "gl-matrix";
import { Mesh } from "../../mesh/types";
import Batcher from "../batching/Batcher";
import { FRAGMENT_SHADER } from "./fragment.shader";
import { VERTEX_SHADER } from "./vertex.shader";
import { createProgram } from "./webgl2.utils";

type ModelViewProjection = {
  model: mat4;
  view: mat4;
  projection: mat4;
};

export type ModelViewProjectionProvider = {
  isDirty: () => boolean;
  provider: () => ModelViewProjection;
};

export default class Renderer {
  private program: WebGLProgram;

  private batcher: Batcher;

  private uniforms: Record<string, WebGLUniformLocation | null>;

  public constructor(
    private gl: WebGL2RenderingContext,
    private mvpProvider: ModelViewProjectionProvider | null = null
  ) {
    this.program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    this.batcher = new Batcher(gl, this.program);
    this.uniforms = {
      model: this.gl.getUniformLocation(this.program, "model"),
      view: this.gl.getUniformLocation(this.program, "view"),
      projection: this.gl.getUniformLocation(this.program, "projection"),
    };
  }

  public init() {
    this.gl.useProgram(this.program);
    this.gl.enable(this.gl.DEPTH_TEST);
  }

  public add(mesh: Mesh) {
    this.batcher.add(mesh);
  }

  public draw() {
    if (this.mvpProvider?.isDirty()) {
      const mvp = this.mvpProvider.provider();
      this.gl.uniformMatrix4fv(this.uniforms.model, false, mvp.model);
      this.gl.uniformMatrix4fv(this.uniforms.view, false, mvp.view);
      this.gl.uniformMatrix4fv(this.uniforms.projection, false, mvp.projection);
    }

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.batcher.draw();
  }
}
