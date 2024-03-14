import ThreeAnimation from "./canvas-animation";
import * as THREE from "three";

class Ocean extends ThreeAnimation {
  ocean: THREE.PlaneGeometry;
  scroll: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.scroll = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000022);
    scene.fog = new THREE.Fog(0x000022, 5, 20)
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 15);
    camera.lookAt(scene.position);
    this.camera = camera;

    const lum = 1;

    const light1 = new THREE.DirectionalLight("cyan", lum);
    light1.position.set(0, 5, 0);
    scene.add(light1);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    ambientLight.position.set(0, 10, 0);
    scene.add(ambientLight);

    const oceanColor = 0x000088

    const material = new THREE.MeshPhongMaterial({
      // color: 0x000088,
      color: oceanColor,
      flatShading: true,
      shininess: 10,
      specular: 0x444444,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(40, 40, 60, 60);
    const positionAttr = geometry.getAttribute("position");
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);
      vertex.setZ(Math.random() * 0.5);
      positionAttr.setXYZ(i, ...vertex.toArray());
    }
    this.ocean = geometry;

    const dotsMaterial = new THREE.PointsMaterial({ color: oceanColor, size: 0.1 });
    const dots = new THREE.Points(geometry, dotsMaterial);
    dots.rotateX(-Math.PI / 2);
    scene.add(dots);

    const linesMaterial = new THREE.LineBasicMaterial({ color: oceanColor, linewidth: 2 });
    const lines = new THREE.LineSegments(geometry, linesMaterial);
    lines.rotateX(-Math.PI / 2);
    scene.add(lines);

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2; // Rotate to lay flat
    scene.add(plane);

    window.addEventListener("scroll", (ev) => {
      this.scroll = window.scrollY;
    })
  }

  override step(time: number): void {
    time /= 5000;
    const t = time / 10;
    const positionAttr = this.ocean.getAttribute("position");
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);
      const xWave = Math.sin(time * 5 + vertex.x + Math.sin(t)) * 0.3;
      const yWave = Math.sin(time * 5 + vertex.y + Math.cos(t)) * 0.3;
      // const noise = Math.sin(t + (vertex.x + vertex.y) * Math.random()) * 0.25;
      vertex.setZ(xWave + yWave);
      positionAttr.setXYZ(i, ...vertex.toArray());
    }
    positionAttr.needsUpdate = true;
    
    const yPos = 5 - this.scroll / 50;
    this.camera.position.y = yPos
    
    if (yPos > 1) {
      this.camera.position.x = Math.sin(-time/2) * 15;
      this.camera.position.z = Math.cos(-time/2) * 15;
      this.camera.lookAt(this.scene.position)
    }
}
}

export default Ocean;