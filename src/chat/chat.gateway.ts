import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket , Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection , OnGatewayDisconnect {

  @WebSocketServer()
  server:Server;

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: string){
    this.server.emit('onmessage',{
      msg:'New message',
      content:data
    });
  }

  handleConnection(client:Socket){
    console.log(`client is connected ${client.id}`);
    
  }

  handleDisconnect(client:Socket){
    console.log(`client is disconnected ${client.id}`);
    
  }
}
