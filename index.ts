import Jimp from 'jimp';
import {httpServer} from './src/http_server';
import robot from 'robotjs';
import {WebSocketServer} from "ws";
import {messageHandler} from "./src/message.handler";
import {Action} from "./src/models";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Connected')
    ws.on('message', function message(data) {
        const action = data.toString().split(' ');
        let px: number | undefined;
        if (action.length === 2) {
            // @ts-ignore
            px = action[1];
        }
        messageHandler(action[0] as Action, px)
        const { x, y } = robot.getMousePos()
        ws.send(`mouse_position ${x},${y}`)
    });

    ws.send('something');
});
