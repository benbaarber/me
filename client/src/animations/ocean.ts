import { ThreeAnimation } from "./canvas-animation";
import * as THREE from "three";

class Ocean extends ThreeAnimation {
  ocean: THREE.PlaneGeometry;
  scroll: number;
  pointer: THREE.Vector2;
  raycaster: THREE.Raycaster;
  pointLight: THREE.PointLight;
  plane: THREE.Plane;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.scroll = 0;

    this.scene.background = new THREE.Color(0x000022);
    this.scene.fog = new THREE.Fog(0x000022, 5, 20);

    this.camera.position.set(0, 3, 15);
    this.camera.lookAt(this.scene.position);

    const lum = 1;

    const light1 = new THREE.DirectionalLight("cyan", lum);
    light1.position.set(0, 5, 0);
    this.scene.add(light1);

    const ambientLight = new THREE.AmbientLight("white", 0.3);
    ambientLight.position.set(0, 10, 0);
    this.scene.add(ambientLight);

    const oceanColor = 0x000088;

    const material = new THREE.MeshPhongMaterial({
      color: oceanColor,
      flatShading: true,
      shininess: 10,
      specular: 0x444444,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(40, 40, 60, 60);
    this.ocean = geometry;

    const dotsMaterial = new THREE.PointsMaterial({
      color: oceanColor,
      size: 0.1,
    });
    const dots = new THREE.Points(geometry, dotsMaterial);
    dots.rotateX(-Math.PI / 2);
    this.scene.add(dots);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: oceanColor,
      linewidth: 2,
    });
    const lines = new THREE.LineSegments(geometry, linesMaterial);
    lines.rotateX(-Math.PI / 2);
    this.scene.add(lines);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    this.scene.add(mesh);

    const pointLight = new THREE.PointLight("magenta", 100, 20);
    pointLight.position.set(100, 5, 100);
    this.scene.add(pointLight);
    this.pointLight = pointLight;

    const planeNormal = new THREE.Vector3(0, 1, 0);
    this.plane = new THREE.Plane(planeNormal, 0);
    this.raycaster = new THREE.Raycaster();

    window.addEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  castPointerLight() {
    if (!this.pointer) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const vector = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.plane, vector);

    if (vector.x || vector.y)
      this.pointLight.position.set(
        vector.x,
        this.pointLight.position.y,
        vector.z,
      );
  }

  onMouseMove(ev: MouseEvent) {
    this.pointer ??= new THREE.Vector2();
    this.pointer.x = (ev.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    this.scroll = window.scrollY;
  }

  override step(time: number): void {
    const yPos = 5 - this.scroll / 50;
    this.camera.position.y = yPos;
    if (yPos < -15) return;

    time /= 1000;
    const positionAttr = this.ocean.getAttribute("position");
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);
      const xWave = Math.sin(time + vertex.x + Math.cos(time / 3)) * 0.25;
      const yWave = Math.sin(time + vertex.y + Math.sin(time / 3)) * 0.25;
      // const noise = Math.sin(t + (vertex.x + vertex.y) * Math.random()) * 0.25;
      positionAttr.setZ(i, xWave + yWave);
    }
    positionAttr.needsUpdate = true;

    this.camera.position.x = Math.sin(-time / 10) * 15;
    this.camera.position.z = Math.cos(-time / 10) * 15;

    if (yPos > 0) {
      if (yPos > 1) this.castPointerLight();
      this.camera.lookAt(this.scene.position);
    } else {
      const target = new THREE.Vector3().copy(this.scene.position);
      this.camera.lookAt(target.setY(this.camera.position.y - 1));
    }

    this.renderer.render(this.scene, this.camera);
  }

  override stop() {
    super.stop();
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("mousemove", this.onMouseMove);
  }
}

export default Ocean;
