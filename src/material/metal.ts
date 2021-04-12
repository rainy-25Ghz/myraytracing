import { Color } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { Ray } from "../utility/ray";
import { randomVec3InUnitSphere, Vec3 } from "../utility/vec3";
import { Material } from "./material";

export class Metal implements Material {
  albedo: Color;
  fuzz: number;
  constructor(a: Color, f: number) {
    this.fuzz = f < 1 ? f : 1;
    this.albedo = a;
  }
  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    rayScattered: Ray
  ): boolean {
    let reflected = Vec3.reflect(rayIn.dir.unit_vector, rec.normal);
    reflected = reflected.add(randomVec3InUnitSphere().multiply(this.fuzz));
    rayScattered.dir = reflected;
    rayScattered.orig = rec.p;
    attenuation.x = this.albedo.x;
    attenuation.y = this.albedo.y;
    attenuation.z = this.albedo.z;
    return reflected.dot(rec.normal) > 0;
  }
}
