import {
  LoginDto,
  RefreshTokenDto,
  TokenResponseDto,
} from '@dad-group-1/backend-common';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { throwHttpError } from '../../helpers/check-utils';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async login(@Body() body: LoginDto): Promise<TokenResponseDto> {
    const result = await this.authenticationService.sendLogin(
      body.email,
      body.password,
    );
    if (!result)
      throwHttpError('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<TokenResponseDto> {
    const result = await this.authenticationService.sendRefreshToken(body);
    if (!result)
      throwHttpError('Token refresh failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }
}
