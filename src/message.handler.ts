import {Action} from "./models";
import robot from "robotjs";

export const messageHandler = (action: Action, size?: { width: number | undefined, length: number | undefined }) => {
    let {x, y} = robot.getMousePos()

    switch (action) {
        case Action.mousePosition:
            return `mouse_position ${x},${y}`
        case Action.drawCircle:
            if (size && size.width) {
                drawCircle(size.width);
                return `draw circle with radius: ${size.width}`
            }
            return `draw circle`
        case Action.drawSquare:
            if (size && size.width) {
                drawSquare(size.width);
            }
            return `draw square`
        case Action.drawRectangular:
                if (size && size.width && size.length) {
                    drawRectangular(size.width, size.length)
                }
            return `mouse_position test`
        case Action.mouseUp:
            return 'mouse_up'
        case Action.mouseRight:
            return 'mouse_right'
        case Action.mouseDown:
            return 'mouse_down'
        case Action.mouseLeft:
            return 'mouse_left'
    }
}

const drawCircle = (radius: number) => {
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

const drawSquare = (width: number) => {
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

const drawRectangular = (width: number, length: number) => {
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