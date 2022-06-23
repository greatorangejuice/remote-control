import {httpServer} from './src/http_server';
import {createWebSocketStream, WebSocketServer} from "ws";
import {messageHandler} from "./src/message.handler";
import {Action} from "./src/models";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws) {
    console.log('Connected')
    const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false})
        duplex.on('data', (data: any) => {
            const action: Array<string | number> = data.toString().split(' ') || null;
            let width: number | undefined;
            let length: number | undefined;
            if (action.length > 1) {
                width = Number(action[1]);
                length = Number(action[2]) || undefined;
            }
            const sizes = {width, length}
            const message = messageHandler(action[0] as Action, sizes)
            duplex.write(message)
        })

});
