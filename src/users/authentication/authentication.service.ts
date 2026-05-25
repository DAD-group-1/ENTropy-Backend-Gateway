import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { usersServiceClientModuleName } from '../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import { LoginResponseDto } from '@dad-group-1/backend-common';
import { catchRpcException } from '../../helpers/check-utils';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}
  async sendLogin(email: string, password: string): Promise<LoginResponseDto> {
    return await firstValueFrom(
      this.usersClient
        .send<LoginResponseDto>({ cmd: 'login' }, { email, password })
        .pipe(catchRpcException<LoginResponseDto>()),
    );
  }
}
