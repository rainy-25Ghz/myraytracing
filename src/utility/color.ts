import { Vec3, Vector } from "./vec3";

export class Color implements Vector {
  public x: number;
  public y: number;
  public z: number;
  constructor();
  constructor(x: number, y: number, z: number);
  constructor(x?: number, y?: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  //加法
  add(vec: Color): Color {
    return new Color(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  }
  //减法
  minus(vec: Color): Color {
    return new Color(this.x - vec.x, this.y - vec.y, this.z - vec.z);
  }
  //数乘
  multiply(t: number): Color {
    return new Color(this.x * t, this.y * t, this.z * t);
  }
  //除
  devide(t: number): Color {
    return this.multiply(1 / t);
  }
  cross(vec: Color): Color {
    return new Color(
      this.y * vec.z - vec.y * this.z,
      -this.x * vec.z + this.z * vec.x,
      this.x * vec.y - this.y * vec.x
    );
  }
  static attenuate(color: Color, attenuation: Color) {
    return new Color(
      color.x * attenuation.x,
      color.y * attenuation.y,
      color.z * attenuation.z
    );
  }
  get r() {
    return Math.abs(Math.round(this.x * 255));
  }

  get g() {
    return Math.abs(Math.round(this.y * 255));
  }

  get b() {
    return Math.abs(Math.round(this.z * 255));
  }
}
let pink = new Color(236 / 255, 217 / 255, 235 / 255);
let pink2 = new Color(224 / 255, 145 / 255, 162 / 255);
let pink3 = new Color(215 / 255, 184 / 255, 185 / 255);
let green = new Color(158 / 255, 185 / 255, 179 / 255);
let yellow = new Color(234 / 255, 191 / 255, 123 / 255);
let green2 = new Color(88 / 255, 111 / 255, 109 / 255);
let blue2 = new Color(87 / 255, 118 / 255, 149 / 255);
const colors = [pink, pink2, pink3, green, yellow, green2, blue2];
export function randomColor(): Color {
  return colors[Math.floor(Math.random() * colors.length)];
}
