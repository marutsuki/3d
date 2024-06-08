import { getVertexBuffer } from "../../mesh/meshing";
import { Mesh } from "../../mesh/types";

type Attribute = {
  attributeName: string;
  extractor: (m: Mesh) => Float32Array;
  indices?: (m: Mesh) => Float32Array;
};
export default class Batcher {
  private meshes: Mesh[] = [];

  public constructor(
    private gl: WebGL2RenderingContext,
    private program: WebGLProgram,
    private attribs: Attribute[] = [
      {
        attributeName: "inPosition",
        extractor: (m) => new Float32Array(m.vertices),
        indices: (m) => new Float32Array(m.indices),
      },
      {
        attributeName: "inColor",
        extractor: (m) => new Float32Array(m.colours),
      },
    ]
  ) {}

  public add(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  public draw() {
    for (const m of this.meshes) {
      for (const attrib of this.attribs) {
        const attribLocation = this.gl.getAttribLocation(
          this.program,
          attrib.attributeName
        );
        this.gl.enableVertexAttribArray(attribLocation);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          attrib.extractor(m),
          this.gl.STATIC_DRAW
        );

        if (attrib.indices) {
          const indexBuffer = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

          this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(attrib.indices(m)),
            this.gl.STATIC_DRAW
          );
        }

        this.gl.vertexAttribPointer(
          attribLocation,
          3,
          this.gl.FLOAT,
          false,
          0,
          0
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
}
