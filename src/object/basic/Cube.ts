import { Colour, Vec3 } from "../../math/types";
import { Mesh } from "../../mesh/types";

const PRISM_INDICES = [
  [1, 0, 2],
  [3, 1, 2],
  [4, 5, 6],
  [5, 7, 6],
  [0, 1, 5],
  [4, 0, 5],
  [1, 3, 5],
  [3, 7, 5],
  [2, 0, 4],
  [2, 4, 6],
  [2, 6, 3],
  [6, 7, 3],
];

const PRISM_VERTICES = [
  [0, 0, 0],
  [0, 0, 1],
  [1, 0, 0],
  [1, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 1, 0],
  [1, 1, 1],
];

export type Cuboid = {
  center: Vec3;
  width: number;
  height: number;
  depth: number;
};

export function meshCube(cube: Cuboid): Mesh {
  const vertices = [];
  for (const v of PRISM_VERTICES) {
    vertices.push({
      x: v[0] * cube.width + cube.center.x,
      y: v[1] * cube.height + cube.center.y,
      z: v[2] * cube.depth + cube.center.z,
    });
  }
  return {
    indices: PRISM_INDICES.flatMap((i) => i),
    vertices,
  };
}
