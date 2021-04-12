import { Color } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { Ray } from "../utility/ray";

export interface Material {
  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    rayScattered: Ray
  ): boolean;
}
