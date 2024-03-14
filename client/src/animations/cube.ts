import * as THREE from "three";
import ThreeAnimation from "./canvas-animation";

class Cube extends ThreeAnimation {
  cube: THREE.Mesh;


  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
    camera.position.z = 2;
    this.camera = camera;

    const scene = new THREE.Scene();
    this.scene = scene;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    this.cube = cube;

    const light = new THREE.DirectionalLight(0xFFF, 5);
    light.position.set(0, 0, 4);
    scene.add(light);
  }

  override step(time: number): void {
    time /= 1000
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
  }
}

export default Cube