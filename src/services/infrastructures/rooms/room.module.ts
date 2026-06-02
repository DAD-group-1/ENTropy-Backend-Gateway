import { Module } from '@nestjs/common';
import { infrastructuresServiceClientModule } from '../../../helpers/client-modules';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [infrastructuresServiceClientModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [infrastructuresServiceClientModule],
})
export class RoomModule {}
