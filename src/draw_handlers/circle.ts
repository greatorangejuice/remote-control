import robot from "robotjs";

export const drawCircle = (radius: number): void => {
    const mousePos = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));
        robot.mouseClick();
        robot.dragMouse(x, y);
    }
};
