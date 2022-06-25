import robot from "robotjs";
import Jimp from "jimp";

export const getScreenshot = async () => {
    const mousePos = robot.getMousePos();
    const x = mousePos.x;
    const y = mousePos.y;
    const width = 200;
    const height = 200;

    const screen = robot.screen.capture(
        x - width / 2,
        y - height / 2,
        width,
        height
    );
    const image = new Jimp({
        data: screen.image,
        width,
        height
    });

    const imageBuffer = await image.getBase64Async('image/png');
    const [, base64String] =  imageBuffer.split(',');
    return base64String;
}
