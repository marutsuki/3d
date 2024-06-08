import BasicCamera from "../../camera/BasicCamera";
import { meshCube } from "../../object/basic/Cube";
import Renderer from "../rendering/Renderer";

export default class World {
  private renderer: Renderer;

  public constructor(gl: WebGL2RenderingContext) {
    const camera = new BasicCamera({
      aspectRatio: gl.canvas.width / gl.canvas.height,
    });
    camera.direction(0, 0, 1);
    this.renderer = new Renderer(gl, camera);
    this.renderer.init();
    this.renderer.add(
      meshCube({
        center: {
          x: 0,
          y: 0,
          z: 10,
        },
        width: 2,
        height: 2,
        depth: 2,
        // Not used
        colour: {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        },
      })
    );
  }

  public start() {
    new Animator(this.renderer.draw.bind(this.renderer));
  }
}

class Animator {
  private now: number;

  private then: number;

  private interval: number;

  constructor(private onUpdate: () => void, fps = 60) {
    this.now = Date.now();
    this.then = Date.now();
    this.interval = 1000 / fps;
    requestAnimationFrame(this.update.bind(this));
  }

  public update() {
    requestAnimationFrame(this.update.bind(this));
    this.now = Date.now();

    if (this.now - this.then >= this.interval) {
      this.onUpdate();
    }
  }
}
