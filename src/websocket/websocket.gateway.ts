import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const allowedOrigins = (process.env.SERVER || '').split(',');

@WebSocketGateway({
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
}) // Se define la clase como un WebSocketGateway
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server; // sirve para inyectar el servidor de WebSocket

  afterInit(server: Server) {
    console.log('WebSocket iniciado');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Cliente conectado', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
  }

  @SubscribeMessage('updateInventory')
  handleMessage(@MessageBody() data: any): void {
    console.log(data);
    const inventoryData = Array.isArray(data) ? data : [data];
    this.server.emit('updateInventory', inventoryData);
  }

  @SubscribeMessage('updateKardex')
  handleKardex(@MessageBody() data: any): void {
    console.log(data);
    const kardexData = Array.isArray(data) ? data : [data];
    this.server.emit('updateKardex', kardexData);
  }

  @SubscribeMessage('deleteKardex')
  handleDeleteKardex(@MessageBody() data: any): void {
    console.log(data);
    const kardexData = Array.isArray(data) ? data : [data];
    this.server.emit('deleteKardex', kardexData);
  }
}
