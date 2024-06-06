import { getVertexBuffer } from "../../mesh/meshing";
import { Mesh } from "../../mesh/types";

export default class Batcher {
  private meshes: Mesh[] = [];

  public constructor(private gl: WebGL2RenderingContext) {}

  public add(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  public draw() {
    for (const m of this.meshes) {
      const vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        getVertexBuffer(m),
        this.gl.STATIC_DRAW
      );

      const indexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(m.indices),
        this.gl.STATIC_DRAW
      );

      this.gl.drawElements(
        this.gl.TRIANGLES,
        m.indices.length,
        this.gl.UNSIGNED_SHORT,
        0
      );
    }
  }
}
