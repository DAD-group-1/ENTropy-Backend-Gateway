import {
  LoginDto,
  LogoutDto,
  LogoutResponseDto,
  RefreshTokenDto,
  TokenResponseDto,
} from '@dad-group-1/backend-common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { throwHttpError } from '../../../helpers/check-utils';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('logout')
  @ApiBody({ type: LogoutDto })
  @ApiGlobalResponse(LogoutResponseDto)
  async logout(@Body() body: LogoutDto): Promise<LogoutResponseDto> {
    const result = await this.authenticationService.sendLogout(body);
    if (!result)
      throwHttpError('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiGlobalResponse(TokenResponseDto)
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
  @ApiBody({ type: RefreshTokenDto })
  @ApiGlobalResponse(TokenResponseDto)
  async refreshToken(@Body() body: RefreshTokenDto): Promise<TokenResponseDto> {
    const result = await this.authenticationService.sendRefreshToken(body);
    if (!result)
      throwHttpError('Token refresh failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('verify')
  verifyToken(): object {
    return {};
  }
}
