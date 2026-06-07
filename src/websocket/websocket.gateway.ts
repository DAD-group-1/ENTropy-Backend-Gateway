import { OnGatewayConnection, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type AuthSocket = Socket & {
  handshake: Socket['handshake'] & {
    auth: {
      userId?: string;
    };
  };
};

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: AuthSocket) {
    const userId = client.handshake.auth?.['userId'];

    if (userId) {
      void client.join(`user_${String(userId)}`);
    }
  }

  emitToUser(userId: number | string, event: string, payload: unknown) {
    const room = `user_${String(userId)}`;

    this.server.to(room).emit(event, payload);
  }
}
