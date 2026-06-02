import { Module } from '@nestjs/common';
import { coursesServiceClientModule } from '../../../helpers/client-modules';
import { CourseController } from '../courses/course.controller';
import { CourseService } from '../courses/course.service';

@Module({
  imports: [coursesServiceClientModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [coursesServiceClientModule],
})
export class ProgramModule {}
