import { Module } from '@nestjs/common';
import { infrastructuresServiceClientModule } from '../../../helpers/client-modules';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';

@Module({
  imports: [infrastructuresServiceClientModule],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [infrastructuresServiceClientModule],
})
export class BuildingModule {}
