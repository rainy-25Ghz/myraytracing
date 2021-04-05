import { Vec3 } from "./vec3";
export class Ray {
  orig: Vec3;
  dir: Vec3;
  constructor();
  constructor(origin: Vec3, direction: Vec3);
  constructor(origin?: Vec3, direction?: Vec3) {
    this.orig = origin || new Vec3();
    this.dir = direction || new Vec3();
  }
  at(t: number): Vec3 {
    return this.orig.add(this.dir.multiply(t));
  }
}
