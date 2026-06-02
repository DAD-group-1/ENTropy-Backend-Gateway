import { Module } from '@nestjs/common';
import { coursesServiceClientModule } from '../../../helpers/client-modules';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [coursesServiceClientModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [coursesServiceClientModule],
})
export class CourseModule {}
