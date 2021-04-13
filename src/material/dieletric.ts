import { Color, randomColor } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { Ray } from "../utility/ray";
import { Vec3 } from "../utility/vec3";
import { Material } from "./material";
// /**
//  * 计算折射后的光线矢量
//  * @param inputV INPUT LIGHT VECTOR（单位向量）
//  * @param n 法线（单位向量）
//  * @param etaiOverEtat 入射介质折射率/出射介质折射率
//  */
// function refract(inputV: Vec3, n: Vec3, etaiOverEtat: number): Vec3 {
//   return direction;
// }
export class Dieletric implements Material {
  ir: number;
  constructor(indexOfRefraction: number) {
    this.ir = indexOfRefraction;
  }
  private reflectance(cosine: number, ref_idx: number) {
    let r0 = (1 - ref_idx) / (1 + ref_idx);
    r0 = r0 ** 2;
    return r0 + (1 - r0) * (1 - cosine) ** 5;
  }
  scatter(
    r_in: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray
  ): boolean {
    attenuation.x = 1;
    attenuation.y = 1;
    attenuation.z = 1;
    //根据入射光线是在物体内部还是外部计算折射率
    let refractionRatio = rec.isFrontFace ? 1 / this.ir : this.ir;
    // let refracted = refract(r_in.dir.unit_vector, rec.normal, refractionRatio);
    let inputV = r_in.dir.unit_vector;
    let n = rec.normal;
    let cosTheta = Math.min(inputV.multiply(-1).dot(n), 1); //入射光与法线夹角
    let sinTheta = Math.sqrt(1 - cosTheta ** 2);
    let direction: Vec3;
    //当折射角不存在时，全反射
    if (
      refractionRatio * sinTheta > 1.0 ||
      this.reflectance(cosTheta, refractionRatio) > Math.random()
    ) {
      direction = Vec3.reflect(inputV, n);
    } else {
      //垂直于法向量的输出分量
      let outputV_perp = inputV
        .add(n.multiply(cosTheta))
        .multiply(refractionRatio);
      //平行于法向量的输出分量
      let outputV_parallel = n.multiply(
        -Math.sqrt(Math.abs(1 - outputV_perp.length_squared))
      );
      direction = outputV_parallel.add(outputV_perp);
    }

    let _scattered = new Ray(rec.p, direction);
    scattered.dir = _scattered.dir;
    scattered.orig = _scattered.orig;
    return true;
  }
}
