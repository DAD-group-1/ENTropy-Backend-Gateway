import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { usersServiceClientModule } from '../../common/client-modules';

@Module({
  imports: [usersServiceClientModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [usersServiceClientModule],
})
export class StudentModule {}
