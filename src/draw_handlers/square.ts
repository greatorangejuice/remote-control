import robot from "robotjs";

const drawLine = (x: number, y: number): void => {
    robot.mouseToggle('down', 'left')
    robot.dragMouse(x, y);
    robot.mouseToggle('up', 'left')
}

export const drawSquare = (width: number): void => {
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

export const drawRectangular = (width: number, length: number): void => {
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
