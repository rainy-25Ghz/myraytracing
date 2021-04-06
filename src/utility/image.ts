import { Color } from "./color";
import { Vec3 } from "./vec3";

export class Image {
  resolutionX: number;
  resolutionY: number;
  resolution: number;
  pixelArray: Color[][];
  constructor(resX: number, resY: number) {
    this.resolutionX = resX;
    this.resolutionY = resY;
    this.resolution = 0;
    this.pixelArray = [];
  }
  pixel(posX: number, posY: number) {
    if (posX >= this.resolutionX || posY >= this.resolutionY) {
      throw new Error("Pixel unavailable");
    }
    return this.pixelArray[posY][posX];
  }
  pushRawPixel(r: number, g: number, b: number): void {
    var pixelRGB = new Color(r, g, b);
    this.pushPixel(pixelRGB);
  }
  pushPixel(pixelRGB: Color) {
    var posX = this.resolution % this.resolutionX;
    var posY = Math.floor(this.resolution / this.resolutionX);
    if (posY < this.resolutionY) {
      if (posX === 0) {
        this.pixelArray.push([]);
      }
      this.pixelArray[posY].push(pixelRGB);
      this.resolution += 1;
    } else {
      throw Error("Pixel Overflow Error");
    }
  }
}
