import * as THREE from "three";
import { ThreeAnimation } from "./canvas-animation";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shaders/tesseract/vertex.glsl";
import fragmentShader from "./shaders/tesseract/fragment.glsl";

class Tesseract extends ThreeAnimation {
  material: THREE.ShaderMaterial;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.camera.position.set(1.5, 3, 4.5);
    this.camera.lookAt(this.scene.position);

    // Tesseract vertices in 4D (x, y, z, w)
    const vertices4D = [
      [-1, -1, -1, 1],
      [1, -1, -1, 1],
      [1, 1, -1, 1],
      [-1, 1, -1, 1],
      [-1, -1, 1, 1],
      [1, -1, 1, 1],
      [1, 1, 1, 1],
      [-1, 1, 1, 1],
      [-1, -1, -1, -1],
      [1, -1, -1, -1],
      [1, 1, -1, -1],
      [-1, 1, -1, -1],
      [-1, -1, 1, -1],
      [1, -1, 1, -1],
      [1, 1, 1, -1],
      [-1, 1, 1, -1],
    ];

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 8],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 12],
      [8, 12],
      [9, 13],
      [10, 14],
      [11, 15],
      [0, 8],
      [1, 9],
      [2, 10],
      [3, 11],
      [4, 12],
      [5, 13],
      [6, 14],
      [7, 15],
    ];

    const positions: number[] = [];
    const wComponents: number[] = [];
    for (const [x, y, z, w] of vertices4D) {
      positions.push(x, y, z);
      wComponents.push(w);
    }
    const positionAttr = new THREE.Float32BufferAttribute(positions, 3);
    const wComponentAttr = new THREE.Float32BufferAttribute(wComponents, 1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positionAttr);
    geometry.setAttribute("wComponent", wComponentAttr);
    geometry.setIndex(edges.flat());

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });

    this.material = material;

    const tesseract = new THREE.LineSegments(geometry, material);
    this.scene.add(tesseract);

    const orbit = new OrbitControls(this.camera, this.canvas);
    orbit.enableZoom = false;
  }

  override step(time: number): void {
    time /= 1000;
    this.material.uniforms.time.value = time;
    this.renderer.render(this.scene, this.camera);
  }
}

export default Tesseract;
