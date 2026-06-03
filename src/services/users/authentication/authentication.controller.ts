import {
  LoginDto,
  LogoutDto,
  LogoutResponseDto,
  RefreshTokenDto,
  TokenResponseDto,
} from '@dad-group-1/backend-common';
import { Body, Controller, Get, HttpStatus, Post, UseGuards, } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { throwHttpError } from '../../../helpers/check-utils';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({
    summary: 'Logout a user and invalidate their refresh token',
    description:
      "Invalidate the user's refresh token to log them out of the system.",
  })
  @Post('logout')
  @ApiBody({ type: LogoutDto })
  @ApiGlobalResponse(LogoutResponseDto)
  async logout(@Body() body: LogoutDto): Promise<LogoutResponseDto> {
    const result = await this.authenticationService.sendLogout(body);
    if (!result)
      throwHttpError('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @ApiOperation({
    summary: 'Login a user and obtain an access token',
    description:
      'Authenticate a user with email and password to receive an access token.',
  })
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

  @ApiOperation({
    summary: 'Refresh an access token using a refresh token',
    description: 'Use a valid refresh token to obtain a new access token.',
  })
  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto })
  @ApiGlobalResponse(TokenResponseDto)
  async refreshToken(@Body() body: RefreshTokenDto): Promise<TokenResponseDto> {
    const result = await this.authenticationService.sendRefreshToken(body);
    if (!result)
      throwHttpError('Token refresh failed', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @ApiOperation({
    summary: 'Verify the validity of an access token',
    description:
      'Check if the provided access token is valid and has not expired.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('verify')
  verifyToken(): object {
    return {};
  }
}
