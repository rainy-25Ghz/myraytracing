import { Material } from "../material/material";
import { HitRecord, Hittable } from "./hittable";
import { Ray } from "./ray";
import { Vec3 } from "./vec3";

export class Sphere implements Hittable {
  center: Vec3;
  radius: number;
  material: Material;
  constructor(cen: Vec3, r: number, mat: Material) {
    this.center = cen;
    this.radius = r;
    this.material = mat;
  }
  hit(r: Ray, tmin: number, tmax: number, rec: HitRecord): boolean {
    let oc = r.orig.minus(this.center); //Orig-C
    let a = r.dir.length_squared;
    let b = oc.dot(r.dir);
    let c = oc.length_squared - this.radius ** 2;
    let iDiscriminant = b * b - a * c;

    if (iDiscriminant > 0) {
      let temp = (-1 * b - Math.sqrt(iDiscriminant)) / a;
      if (temp < tmax && temp > tmin) {
        rec.t = temp;
        rec.p = r.at(temp);
        let out_normal = rec.p.minus(this.center).devide(this.radius);
        rec.setFaceNormal(r, out_normal);
        rec.material = this.material;
        return true;
      }
      temp = (-1 * b + Math.sqrt(iDiscriminant)) / a;
      if (temp < tmax && temp > tmin) {
        rec.t = temp;
        rec.p = r.at(temp);
        let out_normal = rec.p.minus(this.center).devide(this.radius);
        rec.setFaceNormal(r, out_normal);
        rec.material = this.material;
        return true;
      }
    }
    return false;
  }
}
