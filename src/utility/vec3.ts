//import { random } from "./random";
export interface Vector {
  x: number;
  y: number;
  z: number;
  add(vec: Vector): Vector;
  minus(vec: Vector): Vector;
  multiply(t: number): Vector;
  devide(t: number): Vector;
}
export class Vec3 {
  public x: number;
  public y: number;
  public z: number;
  constructor();
  constructor(x: number, y: number, z: number);
  constructor(x?: number, y?: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  //加法
  add(vec: Vec3): Vec3 {
    return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  }
  //减法
  minus(vec: Vec3): Vec3 {
    return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
  }
  //数乘
  multiply(t: number): Vec3 {
    return new Vec3(this.x * t, this.y * t, this.z * t);
  }
  //除
  devide(t: number): Vec3 {
    return this.multiply(1 / t);
  }
  //叉乘
  cross(vec: Vec3): Vec3 {
    return new Vec3(
      this.y * vec.z - vec.y * this.z,
      -this.x * vec.z + this.z * vec.x,
      this.x * vec.y - this.y * vec.x
    );
  }
  //点乘
  dot(vec: Vec3): number {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  }

  /**
   * 向量取负数
   */
  static negative(vec: Vec3): Vec3 {
    return new Vec3(-vec.x, -vec.y, -vec.z);
  }
  //求长度
  get length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  //求长度平方
  get length_squared(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }
  //求单位向量
  get unit_vector(): Vec3 {
    return this.devide(this.length);
  }
  static random_vector(): Vec3 {
    return new Vec3(Math.random(), Math.random(), Math.random());
  }
  static random_unit_sphere_vector(): Vec3 {
    //let vec = new Vec3(Math.random(), Math.random(), Math.random());
    while (true) {
      let temp = Vec3.random_vector().multiply(2).minus(new Vec3(1, 1, 1));
      if (temp.length_squared >= 1) continue;
      return temp;
    }
  }
  static reflect(vecIn: Vec3, n: Vec3): Vec3 {
    let vn2 = n.dot(vecIn) * 2;
    return vecIn.minus(n.multiply(vn2));
  }
}
export function randomVec3InUnitSphere(): Vec3 {
  let _v = new Vec3(Math.random(), Math.random(), Math.random());
  _v = _v.multiply(2).minus(new Vec3(1, 1, 1));
  while (true) {
    if (_v.length_squared < 1) return _v;
    _v = new Vec3(Math.random(), Math.random(), Math.random());
    _v = _v.multiply(2).minus(new Vec3(1, 1, 1));
  }
}
