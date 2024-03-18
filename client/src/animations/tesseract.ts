import * as THREE from "three";
import { ThreeAnimation } from "./canvas-animation";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shaders/tesseract/vertex.glsl";
import fragmentShader from "./shaders/tesseract/fragment.glsl";

class Tesseract extends ThreeAnimation {
  material: THREE.ShaderMaterial;
  faces: THREE.Mesh;
  edges: THREE.LineSegments;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.renderer.autoClear = false;
    this.scene.background = new THREE.Color("black");

    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(0, 5, 0);
    this.scene.add(light);

    this.camera.position.set(2, 4, 6);
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

    const faces = [
      [0, 1, 3],
      [3, 1, 2],
      [4, 5, 7],
      [7, 5, 6],
      [0, 1, 4],
      [4, 1, 5],
      [2, 3, 6],
      [6, 3, 7],
      [0, 3, 4],
      [4, 3, 7],
      [1, 2, 5],
      [5, 2, 6],
      [8, 9, 11],
      [11, 9, 10],
      [12, 13, 15],
      [15, 13, 14],
      [8, 9, 12],
      [12, 9, 13],
      [10, 11, 14],
      [14, 11, 15],
      [8, 11, 12],
      [12, 11, 15],
      [9, 10, 13],
      [13, 10, 14],
      [0, 8, 1],
      [1, 8, 9],
      [1, 9, 2],
      [2, 9, 10],
      [2, 10, 3],
      [3, 10, 11],
      [3, 11, 0],
      [0, 11, 8],
      [4, 12, 5],
      [5, 12, 13],
      [5, 13, 6],
      [6, 13, 14],
      [6, 14, 7],
      [7, 14, 15],
      [7, 15, 4],
      [4, 15, 12],
    ];

    // Tesseract edges, defining connections between vertices
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

    const positions = [],
      wComponents = [];
    for (const [x, y, z, w] of vertices4D) {
      // positions.push(...[x, y, z].map((c) => c * (w / 2 + 1.5)));
      positions.push(x, y, z);
      wComponents.push(w);
    }
    const positionAttr = new THREE.Float32BufferAttribute(positions, 3);
    const wComponentAttr = new THREE.Float32BufferAttribute(wComponents, 1);

    const edgesGeometry = new THREE.BufferGeometry();
    const isEdgeAttr = new THREE.Float32BufferAttribute(
      new Array(16).fill(1),
      1,
    );
    edgesGeometry.setAttribute("position", positionAttr);
    edgesGeometry.setAttribute("wComponent", wComponentAttr);
    edgesGeometry.setAttribute("isEdge", isEdgeAttr);
    edgesGeometry.setIndex(edges.flat());

    const facesGeometry = new THREE.BufferGeometry();
    const isFaceAttr = new THREE.Float32BufferAttribute(
      new Array(16).fill(0),
      1,
    );
    facesGeometry.setAttribute("position", positionAttr);
    facesGeometry.setAttribute("wComponent", wComponentAttr);
    facesGeometry.setAttribute("isEdge", isFaceAttr);
    facesGeometry.setIndex(faces.flat());

    const lightPosition = new THREE.Vector3();
    light.getWorldPosition(lightPosition);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        isFace: { value: false },
        ambientLightColor: { value: new THREE.Color(0x404040) },
        lightColor: { value: new THREE.Color(0xffffff) },
        lightPosition: { value: new THREE.Vector3(10, 10, 10) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.material = material;

    const edgeMesh = new THREE.LineSegments(edgesGeometry, material);
    this.scene.add(edgeMesh);
    this.edges = edgeMesh;

    const faceMesh = new THREE.Mesh(facesGeometry, material);
    this.scene.add(faceMesh);

    new OrbitControls(this.camera, this.canvas);

    // const boxG = new THREE.BoxGeometry(1, 1, 1);
    // const boxM = new THREE.MeshBasicMaterial({ color: "white" });
    // const boxMesh = new THREE.Mesh(boxG, boxM);
    // this.scene.add(boxMesh)
  }

  override step(time: number): void {
    this.renderer.clear();
    this.material.uniforms.time.value = time / 1000;
    this.renderer.render(this.scene, this.camera);
  }
}

export default Tesseract;
