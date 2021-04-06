import Jimp from "jimp";
import { Image } from "./image";

export async function convertImageToPNG(
  imageInput: Image,
  sFileName = "output"
) {
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
