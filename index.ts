import {httpServer} from './src/http_server';
import {createWebSocketStream, WebSocketServer} from "ws";
import {messageHandler} from "./src/message.handler";
import {Action} from "./src/models";

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({port: WS_PORT});
wss.on('listening', () => {
    console.log(`Listening on port: ${WS_PORT}`)
})

wss.on('connection', function connection(ws): void {
    console.log(`Connected `)
    const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false})
        duplex.on('data', async (data: any) => {
            const action: Array<string | number> = data.toString().split(' ') || null;
            let width: number | undefined;
            let length: number | undefined;
            if (action.length > 1) {
                width = Number(action[1]);
                length = Number(action[2]) || undefined;
            }
            const sizes = {width, length}
            const message = await messageHandler(action[0] as Action, sizes)
            duplex.write(message+'\0')
        })
});
wss.on('close', () => {
    console.log('Closed')
})
