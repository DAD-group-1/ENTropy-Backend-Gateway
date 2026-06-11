import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { agentServiceClientModule } from '../../helpers/client-modules';

@Module({
  imports: [agentServiceClientModule],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [agentServiceClientModule],
})
export class AgentModule {}
