import { Camera } from "./utility/camera";
import { HittableList } from "./utility/hittablelist";
import { Sphere } from "./utility/sphere";
import { Vec3 } from "./utility/vec3";
import { Image } from "./utility/image";
import { Ray } from "./utility/ray";
import { HitRecord } from "./utility/hittable";

let imageH = 225;
let imageW = 400;
let aspectRatio = 16 / 9;
let samplePerPixel = 100;
let mimage = new Image(imageW, imageH);

let world = new HittableList();
world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

let camera = new Camera(new Vec3(0, 0, 0), 2, 2 * aspectRatio, 1);

function rayColor(ray: Ray, world: HittableList) {
  let rec = new HitRecord();
}

//renderer
for (let j = imageH - 1; j >= 0; j--) {
  for (let i = 0; i < imageW; i++) {
    let color = new Vec3(0, 0, 0);
    for (let s = 0; s < samplePerPixel; s++) {
      let u = (i + Math.random()) / imageW;
      let v = (j + Math.random()) / imageH;
      let ray = camera.getRay(u, v);
      color = color.add(rayColor(ray, world));
    }
    color = color.devide(samplePerPixel);
    color = new Vec3(
      Math.sqrt(color.x),
      Math.sqrt(color.y),
      Math.sqrt(color.z)
    );
    mimage.pushRawPixel(color.x, color.y, color.z);
  }
}
