import Renderer from "../rendering/Renderer";

export default class World {
  private renderer: Renderer;

  public constructor(gl: WebGL2RenderingContext) {
    this.renderer = new Renderer(gl);
    this.renderer.init();
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
