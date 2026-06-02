import { Module } from '@nestjs/common';
import { infrastructuresServiceClientModule } from '../../../helpers/client-modules';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';

@Module({
  imports: [infrastructuresServiceClientModule],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [infrastructuresServiceClientModule],
})
export class CampusModule {}
