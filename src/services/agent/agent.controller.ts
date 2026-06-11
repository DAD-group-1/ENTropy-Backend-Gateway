import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgentService } from './agent.service';
import { JwtUserInterface } from '../../helpers/interfaces/jwtUser.interface';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';

class AgentRequest {
  @ApiProperty()
  message: string;
}

@Controller('agent')
export class AgentController {
  private readonly logger = new Logger(AgentController.name);
  constructor(private readonly agentService: AgentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AgentRequest })
  @Post('chat')
  async chat(
    @Body() body: { message: string },
    @Req() req: { user: JwtUserInterface; headers: { authorization: string } }, // JwtExtracted user
  ) {
    return this.agentService.chat(
      body.message,
      req.user,
      req.headers.authorization,
    );
  }
}
