import {Action, Size} from "./models";
import robot from "robotjs";
import {getScreenshot} from "./draw_handlers/screenshot";
import {drawRectangular, drawSquare} from "./draw_handlers/square";
import {drawCircle} from "./draw_handlers/circle";

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

