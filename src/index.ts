import { Camera } from "./utility/camera";
import { HittableList } from "./utility/hittablelist";
import { Sphere } from "./utility/sphere";
import { Vec3 } from "./utility/vec3";
import { Image } from "./utility/image";
import { Ray } from "./utility/ray";
import { HitRecord } from "./utility/hittable";
import Jimp from "jimp";
let imageH = 225;
let imageW = 400;
let aspectRatio = 16 / 9;
let samplePerPixel = 100;
let mimage = new Image(imageW, imageH);

let world = new HittableList();
world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

let camera = new Camera(new Vec3(0, 0, 0), 2, 2 * aspectRatio, 1);

function randomVec3InUnitSphere(): Vec3 {
  let _v = new Vec3(Math.random(), Math.random(), Math.random());
  _v = _v.multiply(2).minus(new Vec3(1, 1, 1));
  while (true) {
    if (_v.length_squared < 1) return _v;
    _v = new Vec3(Math.random(), Math.random(), Math.random());
    _v = _v.multiply(2).minus(new Vec3(1, 1, 1));
  }
}

function rayColor(ray: Ray, world: HittableList, depth: number): Vec3 {
  let rec = new HitRecord();
  if (depth <= 0) return new Vec3(0, 0, 0);
  if (world.hit(ray, 0.001, +Infinity, rec)) {
    let s = rec.p.add(rec.normal).add(randomVec3InUnitSphere());
    let p_s = s.minus(rec.p);
    return rayColor(new Ray(rec.p, p_s), world, depth - 1).multiply(0.5);
  } else {
    let t = (ray.dir.unit_vector.y + 1) * 0.5;
    let white = new Vec3(1, 1, 1);
    let blue = new Vec3(0.5, 0.7, 1.0);
    return white.multiply(1 - t).add(blue.multiply(t));
  }
}
// function rayColor(ray: Ray, world: HittableList): Vec3 {
//   let rec = new HitRecord();
//   if (world.hit(ray, 0.001, +Infinity, rec)) {
//     let n = rec.normal; //normal自动转为单位向量
//     return n.add(new Vec3(1, 1, 1)).devide(2);
//   } else {
//     let t = (ray.dir.unit_vector.y + 1) * 0.5;
//     let white = new Vec3(1, 1, 1);
//     let blue = new Vec3(0.5, 0.7, 1.0);
//     return white.multiply(1 - t).add(blue.multiply(t));
//   }
// }
//renderer
for (let j = imageH - 1; j >= 0; j--) {
  for (let i = 0; i < imageW; i++) {
    let color = new Vec3(0, 0, 0);
    for (let s = 0; s < samplePerPixel; s++) {
      let u = (i + Math.random()) / imageW;
      let v = (j + Math.random()) / imageH;
      let ray = camera.getRay(u, v);
      color = color.add(rayColor(ray, world, 50));
    }
    color = color.devide(samplePerPixel);
    color = new Vec3(
      Math.sqrt(color.x),
      Math.sqrt(color.y),
      Math.sqrt(color.z)
    );
    mimage.pushRawPixel(color.x, color.y, color.z);
  }
  console.log(`lines ${imageH - 1 - j}`);
}

async function convertImageToPNG(imageInput: Image, sFileName = "output") {
  var sFilePath = sFileName + "." + "png";
  function onSave(oError) {
    if (oError) {
      console.log("Error while saving file");
    } else {
      console.log("Successfully saved the file  ");
    }
  }
  let oJimpImage = new Jimp(
    imageInput.resolutionX,
    imageInput.resolutionY,
    function (oError, oImage) {
      if (oError) {
        throw oError;
      }
      imageInput.pixelArray.forEach((pixelRow, y) => {
        pixelRow.forEach((pixel, x) => {
          oImage.setPixelColor(
            Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, 255),
            x,
            y
          );
        });
      });
      oImage.write(sFilePath, onSave);
    }
  );
}
convertImageToPNG(mimage);
