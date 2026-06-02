import { Module } from '@nestjs/common';
import { infrastructuresServiceClientModule } from '../../../helpers/client-modules';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';

@Module({
  imports: [infrastructuresServiceClientModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [infrastructuresServiceClientModule],
})
export class RoomTypeModule {}
