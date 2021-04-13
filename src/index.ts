import { Camera } from "./utility/camera";
import { HittableList } from "./utility/hittablelist";
import { Sphere } from "./utility/sphere";
import { Vec3 } from "./utility/vec3";
import { Image } from "./utility/image";
import { Ray } from "./utility/ray";
import { HitRecord } from "./utility/hittable";
import { convertImageToPNG } from "./utility/img2png";
import { Color } from "./utility/color";
import { Metal } from "./material/metal";
import { Lambertian } from "./material/lambertian";
import { Dieletric } from "./material/dieletric";

let imageH = 225;
let imageW = 400;
let aspectRatio = 16 / 9;
let samplePerPixel = 100;
let mimage = new Image(imageW, imageH);

const groundMat = new Lambertian(new Color(0.8, 0.8, 0));
const centerMat = new Lambertian(new Color(0.1, 0.2, 0.5));
// const lMat = new Lambertian(new Color(0, 0, 1));
// const rMat = new Lambertian(new Color(1, 0, 0));
//const centerMat = new Dieletric(1.5);
//const leftMat = new Metal(new Color(0.8, 0.8, 0.8), 0.3);
const leftMat = new Dieletric(1.5);
const rightMat = new Metal(new Color(0.8, 0.6, 0.2), 0.0);
let world = new HittableList();
world.add(new Sphere(new Vec3(0.0, -100.5, -1.0), 100.0, groundMat));
world.add(new Sphere(new Vec3(0.0, 0.0, -1.0), 0.5, centerMat));
world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, leftMat));
world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), -0.45, leftMat));
world.add(new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, rightMat));

let lookFrom = new Vec3(3, 3, 2);
let lookAt = new Vec3(0, 0, -1);
let distFocus = lookFrom.minus(lookAt).length;
let camera = new Camera(
  lookFrom,
  lookAt,
  new Vec3(0, 1, 0),
  2,
  aspectRatio,
  20,
  2,
  distFocus
);

function rayColor(ray: Ray, world: HittableList, depth: number): Color {
  let rec = new HitRecord();
  if (depth <= 0) return new Color(0, 0, 0);
  if (world.hit(ray, 0.001, +Infinity, rec)) {
    // let s = rec.p.add(rec.normal).add(randomVec3InUnitSphere().unit_vector); //Correct rendering of Lambertian spheres
    // let p_s = s.minus(rec.p);
    // return rayColor(new Ray(rec.p, p_s), world, depth - 1).multiply(0.5);
    let scattered = new Ray();
    let attenuation = new Color();
    if (rec.material.scatter(ray, rec, attenuation, scattered)) {
      return Color.attenuate(
        rayColor(scattered, world, depth - 1),
        attenuation
      );
    }
    return new Color(0, 0, 0);
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
