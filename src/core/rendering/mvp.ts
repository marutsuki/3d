import { mat4 } from "gl-matrix";

export type ModelViewProjection = {
  model: mat4;
  view: mat4;
  projection: mat4;
};
