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

const PRISM_COLOURS = [
  [0.5, 0.5, 0.8],
  [0.7, 0.4, 0.1],
  [0.8, 0.8, 1],
  [0.1, 0.2, 0.9],
  [0.3, 0.5, 0.8],
  [0.9, 22, 0.1],
  [0.1, 0.3, 0.5],
  [0.3, 0.7, 0.5],
  [0.5, 0.0, 0.4],
  [0.2, 0.4, 0.6],
  [0.8, 0.6, 0.3],
  [0.6, 0.7, 0.3],
];
export type Cuboid = {
  center: Vec3;
  width: number;
  height: number;
  depth: number;
  colour: Colour;
};

export function meshCube(cube: Cuboid): Mesh {
  const vertices = [];
  for (const v of PRISM_VERTICES) {
    vertices.push(
      (v[0] - 0.5) * cube.width + cube.center.x,
      (v[1] - 0.5) * cube.height + cube.center.y,
      (v[2] - 0.5) * cube.depth + cube.center.z
    );
  }
  return {
    indices: PRISM_INDICES.flatMap((i) => i),
    vertices,
    colours: PRISM_COLOURS.flatMap((i) => i),
  };
}
