import { Vec3 } from "../math/types";
import { Mesh } from "./types";

export function createMesh(vertices: Vec3[]): Mesh {
  let i = 0;
  let indexMap: Record<
    string,
    {
      index: number;
      vertex: Vec3;
    }
  > = {};
  let indices = [];
  let newVertices = [];
  for (const v of vertices) {
    const key = v.x + "_" + v.y + "_" + v.z;
    if (!(key in indexMap)) {
      indexMap[key] = {
        index: i++,
        vertex: v,
      };
      newVertices.push(v);
    }
    indices.push(indexMap[key].index);
  }
  return {
    indices,
    vertices: newVertices,
  };
}

export const getVertexBuffer = (mesh: Mesh) =>
  new Float32Array(mesh.vertices.flatMap((v) => [v.x, v.y, v.z]));
