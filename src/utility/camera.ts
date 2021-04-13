import { Vec3 } from "./vec3";
import { Ray } from "./ray";
export class Camera {
  private origin: Vec3;
  private horizontal: Vec3;
  private vertical: Vec3;
  private lower_left_corner: Vec3;
  viewport_width: number;
  viewport_height: number;
  //aspect_ratio:number
  focal_length: number;

  constructor(
    origin: Vec3,
    viewportH: number,
    aspectRatio: number,
    focal_length: number,
    vfov: number //vertical field-of-view in degrees
  ) {
    let theta = degreesToRadians(vfov);

    let h = Math.tan(theta / 2);
    this.origin = origin;
    this.focal_length = focal_length;
    this.viewport_height = viewportH * h;
    this.viewport_width = aspectRatio * this.viewport_height;
    this.horizontal = new Vec3(this.viewport_width, 0, 0);
    this.vertical = new Vec3(0, this.viewport_height, 0);
    //origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length)
    this.lower_left_corner = this.origin
      .minus(this.horizontal.devide(2))
      .minus(this.vertical.devide(2))
      .minus(new Vec3(0, 0, focal_length));
  }

  //获取射向视口坐标为（u,v)的光线
  public getRay(u: number, v: number): Ray {
    let dir = this.lower_left_corner
      .add(this.horizontal.multiply(u))
      .add(this.vertical.multiply(v))
      .minus(this.origin);
    return new Ray(this.origin, dir);
  }
}
function degreesToRadians(degrees: number): number {
  return (degrees / 180) * Math.PI;
}
