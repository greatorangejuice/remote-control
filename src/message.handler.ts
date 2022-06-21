import {Action} from "./models";

export const messageHandler = (action: Action, px?: number) => {
    switch (action) {
        case Action.mousePosition:
            console.log('Mouse position')
            break;
        default:
            console.log('Test default')
    }
}
