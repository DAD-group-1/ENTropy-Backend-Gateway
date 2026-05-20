import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { usersClientModule } from '../users.module';

@Module({
  imports: [usersClientModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [usersClientModule],
})
export class StudentModule {}
