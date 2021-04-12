import { Color } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { Ray } from "../utility/ray";
import { Vec3 } from "../utility/vec3";
import { Material } from "./material";

export class Metal implements Material {
  albedo: Color;
  constructor(a: Color) {
    this.albedo = a;
  }
  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    rayScattered: Ray
  ): boolean {
    let reflected = Vec3.reflect(rayIn.dir.unit_vector, rec.normal);
    let scattered = new Ray(rec.p, reflected);
    attenuation = this.albedo;
    return scattered.dir.dot(rec.normal) > 0;
  }
}
