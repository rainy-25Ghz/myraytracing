import { Vec3 } from "./vec3";
import { Ray } from "./ray";

export class Camera {
  private origin: Vec3;
  private horizontal: Vec3;
  private vertical: Vec3;
  private lower_left_corner: Vec3;
  viewport_width: number;
  viewport_height: number;
  lensRadius: number;
  u: Vec3;
  v: Vec3;
  w: Vec3;
  //aspect_ratio:number
  //focal_length: number;

  constructor(
    lookFrom: Vec3,
    lookAt: Vec3,
    vup: Vec3,
    viewportH: number,
    aspectRatio: number,
    vfov: number, //vertical field-of-view in degrees
    aperture: number, //镜头直径
    focusDist: number //焦距
  ) {
    let theta = degreesToRadians(vfov);
    let h = Math.tan(theta / 2);
    this.origin = lookFrom;
    //this.focal_length = focal_length;
    this.viewport_height = viewportH * h;
    this.viewport_width = aspectRatio * this.viewport_height;

    let w = lookFrom.minus(lookAt).unit_vector;
    let u = vup.cross(w);
    let v = w.cross(u);
    this.lensRadius = aperture / 2;
    this.horizontal = u.multiply(this.viewport_width).multiply(focusDist);
    this.vertical = v.multiply(this.viewport_height).multiply(focusDist);
    //origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length)
    this.lower_left_corner = this.origin
      .minus(this.horizontal.devide(2))
      .minus(this.vertical.devide(2))
      .minus(w.multiply(focusDist));
    this.w = w;
    this.u = u;
    this.v = v;
  }

  //获取射向视口坐标为（u,v)的光线
  public getRay(u: number, v: number): Ray {
    let rd = Vec3.randomInUnitDisk().multiply(this.lensRadius);
    let offset = this.u.multiply(rd.x).add(this.v.multiply(rd.y));
    let dir = this.lower_left_corner
      .add(this.horizontal.multiply(u))
      .add(this.vertical.multiply(v))
      .minus(this.origin)
      .minus(offset);
    return new Ray(this.origin.add(offset), dir);
  }
}
function degreesToRadians(degrees: number): number {
  return (degrees / 180) * Math.PI;
}
