import * as THREE from "three";

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
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000022);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.threeScale();

    window.addEventListener("resize", this.onResize.bind(this));
  }

  threeScale() {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  onResize() {
    if (this.parentWidth !== this.canvas.parentElement.clientWidth) {
      this.parentWidth = this.canvas.parentElement.clientWidth;
      this.scale();
      this.threeScale();
    }
  }

  override stop() {
    super.stop();
    window.removeEventListener("resize", this.onResize);
  }
}
