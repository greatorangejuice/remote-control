import Jimp from 'jimp';
import {httpServer} from './src/http_server';
import robot from 'robotjs';
import {WebSocketServer, createWebSocketStream, WebSocket} from "ws";
import {messageHandler} from "./src/message.handler";
import {Action} from "./src/models";
import * as Stream from "stream";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({port: 8080});


// const duplex = createWebSocketStream(wss, {encoding: 'utf8'})
// duplex.on('data', (data: any) => {
//     console.log('In duplex')
//     console.log(data)
// })

wss.on('connection', function connection(ws) {
    console.log('Connected')
    ws.on('message', function message(data) {
        const action: Array<string | number> = data.toString().split(' ') || null;
        console.log(action)
        let width: number | undefined;
        let length: number | undefined;
        if (action.length > 1) {
            width = Number(action[1]);
            length = Number(action[2]) || undefined;
        }
        const sizes = {width, length}
        const message = messageHandler(action[0] as Action, sizes)
        ws.send(message)
    });

    ws.send('something');
});
