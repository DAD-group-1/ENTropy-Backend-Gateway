import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { usersServiceClientModuleName } from '../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import { RefreshTokenDto, TokenResponseDto } from '@dad-group-1/backend-common';
import { catchRpcException } from '../../helpers/check-utils';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}
  async sendLogin(email: string, password: string): Promise<TokenResponseDto> {
    return await firstValueFrom(
      this.usersClient
        .send<TokenResponseDto>({ cmd: 'login' }, { email, password })
        .pipe(catchRpcException<TokenResponseDto>()),
    );
  }

  async sendRefreshToken(
    refresh_token: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    return await firstValueFrom(
      this.usersClient
        .send<TokenResponseDto>({ cmd: 'refresh_token' }, refresh_token)
        .pipe(catchRpcException<TokenResponseDto>()),
    );
  }
}
