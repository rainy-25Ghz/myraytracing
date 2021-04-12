import { Camera } from "./utility/camera";
import { HittableList } from "./utility/hittablelist";
import { Sphere } from "./utility/sphere";
import { Vec3 } from "./utility/vec3";
import { Image } from "./utility/image";
import { Ray } from "./utility/ray";
import { HitRecord } from "./utility/hittable";
import { convertImageToPNG } from "./utility/img2png";
import { Color } from "./utility/color";

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

function rayColor(ray: Ray, world: HittableList, depth: number): Color {
  let rec = new HitRecord();
  if (depth <= 0) return new Color(0, 0, 0);
  if (world.hit(ray, 0.001, +Infinity, rec)) {
    let s = rec.p.add(rec.normal).add(randomVec3InUnitSphere().unit_vector); //Correct rendering of Lambertian spheres
    let p_s = s.minus(rec.p);
    return rayColor(new Ray(rec.p, p_s), world, depth - 1).multiply(0.5);
  } else {
    let t = (ray.dir.unit_vector.y + 1) * 0.5;
    let white = new Color(1, 1, 1);
    let blue = new Color(0.5, 0.7, 1.0);
    return white.multiply(1 - t).add(blue.multiply(t));
  }
}

//renderer
for (let j = imageH - 1; j >= 0; j--) {
  for (let i = 0; i < imageW; i++) {
    let color = new Color(0, 0, 0);
    for (let s = 0; s < samplePerPixel; s++) {
      let u = (i + Math.random()) / imageW;
      let v = (j + Math.random()) / imageH;
      let ray = camera.getRay(u, v);
      color = color.add(rayColor(ray, world, 50));
    }
    color = color.devide(samplePerPixel);
    color = new Color(
      Math.sqrt(color.x),
      Math.sqrt(color.y),
      Math.sqrt(color.z)
    );
    mimage.pushPixel(color);
  }
  console.log(`lines ${imageH - 1 - j}`);
}

convertImageToPNG(mimage);
