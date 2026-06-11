import { Body, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { JwtUserInterface } from '../../helpers/interfaces/jwtUser.interface';

@Injectable()
export class AgentService {
  constructor(@Inject('AGENT_SERVICE') private readonly client: ClientProxy) {}
  async chat(message: string, user: JwtUserInterface, token: string) {
    return firstValueFrom(
      this.client.send<{ response: string }>('agent.chat', {
        message: message,
        user: user,
        token: token,
      }),
    );
  }
}
