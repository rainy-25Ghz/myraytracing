import { Material } from "../material/material";
import { Ray } from "./ray";
import { Vec3 } from "./vec3";
export class HitRecord {
  /**
   * 光线击中点的坐标
   */
  p: Vec3;
  /**
   * 法向量
   */
  normal: Vec3;
  /**
   * 光线击中时对应的t
   */
  t: number;
  /**
   * 光线在物体外部设为true，反之为false
   */
  isFrontFace: boolean;
  /**
   *
   * @ 判定光线在物体内还是物体外，修正法线方向朝外，
   */
  setFaceNormal(r: Ray, outward_normal: Vec3): void {
    this.isFrontFace = r.dir.dot(outward_normal) < 0;
    this.normal = this.isFrontFace
      ? outward_normal
      : Vec3.negative(outward_normal);
  }
  /**
   * 记录击中面的材质
   */
  material: Material;
  //   constructor() {
  //     //this.p=new Vec3();
  //     //this.isFrontFace=false;
  //     //this.normal = new Vec3();
  //     //this.
  //   }
}

export interface Hittable {
  hit(r: Ray, t_min: number, t_max: number, rec: HitRecord): boolean;
}
