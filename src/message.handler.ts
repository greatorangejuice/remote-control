import {Action, Size} from "./models";
import robot from "robotjs";
import Jimp from 'jimp';

export const messageHandler = async (action: Action, size?: Size) => {
   return await asyncSwitch(action, size)
}

const asyncSwitch = async (action: Action, size?: Size | undefined) => {
    let {x, y} = robot.getMousePos()
    switch (action) {
        case Action.mousePosition:
            return `${Action.mousePosition} ${x},${y}`
        case Action.drawCircle:
            if (size && size.width) {
                drawCircle(size.width);
                return `draw_circle with radius: ${size.width}`
            }
            return Action.drawCircle
        case Action.drawSquare:
            if (size && size.width) {
                drawSquare(size.width);
            }
            return Action.drawSquare
        case Action.drawRectangular:
            if (size && size.width && size.length) {
                drawRectangular(size.width, size.length)
            }
            return Action.drawRectangular
        case Action.printScreen:
            return `${Action.printScreen} ${await getScreenshot()}`
        case Action.mouseUp:
            return Action.mouseUp
        case Action.mouseRight:
            return Action.mouseRight
        case Action.mouseDown:
            return Action.mouseDown
        case Action.mouseLeft:
            return Action.mouseLeft
    }

}

const drawCircle = (radius: number): void => {
    const mousePos = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));
        robot.mouseClick();
        robot.dragMouse(x, y);
    }
};

const drawLine = (x: number, y: number): void => {
    robot.mouseToggle('down', 'left')
    robot.dragMouse(x, y);
    robot.mouseToggle('up', 'left')
}

const drawSquare = (width: number): void => {
    const mousePos = robot.getMousePos();
    const x = mousePos.x;
    const y = mousePos.y;
    const x1 = x + width;
    const y1 = y + width;

    drawLine(x1, y);
    drawLine(x1, y1);
    drawLine(x, y1);
    drawLine(x, y);

}

const drawRectangular = (width: number, length: number): void => {
    const mousePos = robot.getMousePos();
    const x = mousePos.x;
    const y = mousePos.y;
    const x1 = x + width;
    const y1 = y + length;
    drawLine(x1, y);
    drawLine(x1, y1);
    drawLine(x, y1);
    drawLine(x, y);
}

const getScreenshot = async () => {
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


