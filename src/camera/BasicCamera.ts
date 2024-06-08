import { mat4, vec3 } from "gl-matrix";

import { ModelViewProjectionProvider } from "../core/rendering/Renderer";

type BasicCameraConfig = {
  center: vec3;
  aspectRatio: number;
  fov: number;
  minDistance: number;
  maxDistance: number;
};

const DEFAULT_CONFIG: BasicCameraConfig = {
  center: [0, 0, 0],
  aspectRatio: 4 / 3,
  fov: Math.PI / 4,
  minDistance: 0.1,
  maxDistance: 200000,
};

export default class BasicCamera implements ModelViewProjectionProvider {
  private static DEFAULT_DIRECTION: vec3 = [0, 0, 1];
  private static UP: vec3 = [0, 1, 0];

  private model: mat4 = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  private view: mat4;
  private projection: mat4;

  private config: BasicCameraConfig;

  private lookAtVector: vec3 = BasicCamera.DEFAULT_DIRECTION;

  private dirty: boolean = true;

  public constructor(config: Partial<BasicCameraConfig>) {
    this.config = Object.assign({ ...DEFAULT_CONFIG }, config);
    this.view = mat4.create();
    this.projection = mat4.create();
    this.onUpdate();
  }

  public rotation(xRotation: number, yRotation: number, zRotation: number) {
    const ref: vec3 = BasicCamera.DEFAULT_DIRECTION;
    vec3.rotateX(this.lookAtVector, ref, this.config.center, xRotation);
    vec3.rotateY(this.lookAtVector, ref, this.config.center, yRotation);
    vec3.rotateZ(this.lookAtVector, ref, this.config.center, zRotation);

    this.onUpdate();
  }

  public direction(x: number, y: number, z: number) {
    this.lookAtVector = [x, y, z];
    this.onUpdate();
  }

  public center(x: number, y: number, z: number) {
    this.config.center = [x, y, z];
  }

  public isDirty() {
    return this.dirty;
  }

  public provider() {
    this.dirty = false;
    return {
      model: this.model,
      view: this.view,
      projection: this.projection,
    };
  }

  private onUpdate() {
    mat4.lookAt(this.view, this.config.center, this.lookAtVector, BasicCamera.UP);
    mat4.perspective(
      this.projection,
      this.config.fov,
      this.config.aspectRatio,
      this.config.minDistance,
      this.config.maxDistance
    );
    this.dirty = true;
  }
}
