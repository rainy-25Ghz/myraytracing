import { HitRecord, Hittable } from "./hittable";
import { Ray } from "./ray";
export class HittableList {
  list: Hittable[];
  constructor() {
    this.list = [];
  }
  add(object: Hittable) {
    this.list.push(object);
  }
  hit(r: Ray, tmin: number, tmax: number, rec: HitRecord): boolean {
    let hasHitSth = false;
    let closestT = tmax;
    for (let i = 0; i < this.list.length; i++) {
      if (this.hit(r, tmin, closestT, rec)) {
        hasHitSth = true;
        closestT = rec.t;
      }
    }
    return hasHitSth;
  }
}
