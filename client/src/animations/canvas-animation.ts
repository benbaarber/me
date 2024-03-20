import * as THREE from "three";

export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export abstract class AnimationBase {
  canvas: HTMLCanvasElement;
  parentWidth: number;
  frame: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scale();
    this.parentWidth = canvas.parentElement.clientWidth;
  }

  scale() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = dpr * rect.width;
    const h = dpr * rect.height;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  abstract step(time: number): void;

  start() {
    const animate = (time: number) => {
      this.step(time);
      this.frame = window.requestAnimationFrame(animate);
    };

    this.frame = window.requestAnimationFrame(animate);
  }

  stop() {
    if (this.frame) window.cancelAnimationFrame(this.frame);
  }
}

export abstract class CanvasAnimation extends AnimationBase {
  cx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.cx = canvas.getContext("2d");
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    if (this.parentWidth !== this.canvas.parentElement.clientWidth) {
      this.parentWidth = this.canvas.parentElement.clientWidth;
      this.scale();
    }
  }

  override stop() {
    super.stop();
    window.removeEventListener("resize", this.onResize);
  }
}

export abstract class ThreeAnimation extends AnimationBase {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000,
    );

    this.threeScale();

    window.addEventListener("resize", this.onResize.bind(this));
  }

  threeScale() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    this.renderer.setSize(w, h, false);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  onResize() {
    if (this.parentWidth !== this.canvas.parentElement.clientWidth) {
      this.parentWidth = this.canvas.parentElement.clientWidth;
      this.threeScale();
    }
  }

  override stop() {
    super.stop();
    window.removeEventListener("resize", this.onResize);
  }
}
