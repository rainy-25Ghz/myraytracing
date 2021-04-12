import { Color } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { Ray } from "../utility/ray";
import { randomVec3InUnitSphere } from "../utility/vec3";
import { Material } from "./material";

export class Lambertian implements Material {
  albedo: Color;
  constructor(a: Color) {
    this.albedo = a;
  }
  scatter(
    r_in: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray
  ): boolean {
    let scatterDir = rec.normal.add(randomVec3InUnitSphere().unit_vector);
    scattered.orig = rec.p;
    scattered.dir = scatterDir;
    attenuation.x = this.albedo.x;
    attenuation.y = this.albedo.y;
    attenuation.z = this.albedo.z;

    return true;
  }
}
