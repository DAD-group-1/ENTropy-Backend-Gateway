import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { usersServiceClientModule } from '../../common/client-modules';

@Module({
  imports: [usersServiceClientModule],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports: [usersServiceClientModule],
})
export class InstructorModule {}
