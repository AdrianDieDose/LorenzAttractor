import * as THREE from "three";
class lorenzAttractorClass {
  constructor() {
    this.x = 1;
    this.y = 1;
    this.z = 1;

    this.a = 10;
    this.b = 28;
    this.c = 8.0 / 3.0;

    this.prevVect = new THREE.Vector3(0, 0, 0);

    //COLOR GRADIENTS
    this.colorWheel = [
      0xfff000, 0xffeb00, 0xffe500, 0xffdf00, 0xffd900, 0xffd300, 0xffcd00,
      0xffc600, 0xffc000, 0xffb900, 0xffb100, 0xffaa0a, 0xffa319, 0xff9b24,
      0xff932d, 0xff8a35, 0xff823d, 0xff7945, 0xff6f4d, 0xff6555, 0xff5b5c,
      0xff5064, 0xff436c, 0xff3574, 0xff247c, 0xff0584, 0xff008c, 0xff0095,
      0xff009e, 0xff00a6, 0xff00af, 0xff00b8, 0xff00c1, 0xff00ca, 0xff00d3,
      0xff00dc, 0xff00e4, 0xff00ed, 0xff00f6, 0xff00fe,
    ];
    this.colorOrder = 1;
    this.colorBounce = false;
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
    let dt = 0.003;
    let dx = this.getA * (this.getY - this.getX) * dt;
    let dy = (this.getX * (this.getB - this.getZ) - this.getY) * dt;
    let dz = (this.getX * this.getY - this.getC * this.getZ) * dt;

    this.setX(this.getX + dx);
    this.setY(this.getY + dy);
    this.setZ(this.getZ + dz);
  }
  getLine() {
    const material = new THREE.MeshBasicMaterial({
      color: this.colorWheel[this.colorOrder],
    });
    const pointVec = [];
    pointVec.push(this.prevVect);
    this.draw();
    pointVec.push(new THREE.Vector3(this.getX, this.getY, this.getZ));
    this.prevVect = new THREE.Vector3(this.getX, this.getY, this.getZ);
    const geometry = new THREE.BufferGeometry().setFromPoints(pointVec);
    const line = new THREE.Line(geometry, material);

    //COLOR GRADIENTS
    if (this.colorOrder >= this.colorWheel.length - 1 || this.colorOrder <= 0) {
      this.colorBounce = !this.colorBounce;
    }

    if (this.colorBounce) {
      this.colorOrder--;
    } else {
      this.colorOrder++;
    }
    return line;
  }
}
export { lorenzAttractorClass };
