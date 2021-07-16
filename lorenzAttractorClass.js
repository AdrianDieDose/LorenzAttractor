import * as THREE from "three";
class lorenzAttractorClass {
  constructor() {
    this.x = 0.01;
    this.y = 0;
    this.z = 0;

    this.a = 10;
    this.b = 28;
    this.c = 8.0 / 3.0;

    this.prevVect = new THREE.Vector3(0, 0, 0);
    this.colorWheel = [
      0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x4b0082, 0xee82ee,
    ];
  }

  //GET/SET XYZ
  get getX() {
    return this.x;
  }
  get getY() {
    return this.y;
  }
  get getZ() {
    return this.z;
  }
  setX(value) {
    this.x = value;
  }
  setY(value) {
    this.y = value;
  }
  setZ(value) {
    this.z = value;
  }

  //GET/SET ABC
  get getA() {
    return this.a;
  }
  get getB() {
    return this.b;
  }
  get getC() {
    return this.c;
  }
  draw() {
    let dt = 0.01;
    let dx = this.getA * (this.getY - this.getX) * dt;
    let dy = (this.getX * (this.getB - this.getZ) - this.getY) * dt;
    let dz = (this.getX * this.getY - this.getC * this.getZ) * dt;

    this.setX(this.getX + dx);
    this.setY(this.getY + dy);
    this.setZ(this.getZ + dz);
  }
  getLine() {
    const material = new THREE.MeshBasicMaterial({
      color:
        this.colorWheel[Math.floor(Math.random() * this.colorWheel.length)],
    });
    const pointVec = [];
    pointVec.push(this.prevVect);
    this.draw();
    pointVec.push(new THREE.Vector3(this.getX, this.getY, this.getZ));
    this.prevVect = new THREE.Vector3(this.getX, this.getY, this.getZ);
    const geometry = new THREE.BufferGeometry().setFromPoints(pointVec);
    const line = new THREE.Line(geometry, material);

    return line;
  }
}
export { lorenzAttractorClass };
