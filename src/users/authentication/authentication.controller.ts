import { LoginDto, LoginResponseDto } from '@dad-group-1/backend-common';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const result = await this.authenticationService.sendLogin(
      body.email,
      body.password,
    );
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }
}
