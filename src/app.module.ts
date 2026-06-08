import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './services/users/students/student.module';
import { InstructorModule } from './services/users/instructors/instructor.module';
import { AuthenticationModule } from './services/users/authentication/authentication.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthorizationModule } from './services/users/authorization/authorization.module';
import { AttendanceModule } from './services/attendances/attendances/attendance.module';
import { PaymentMethodModule } from './services/billing/payment-methods/payment-method.module';
import { PaymentModule } from './services/billing/payments/payment.module';
import { CourseModule } from './services/courses/courses/course.module';
import { ProgramModule } from './services/courses/programs/program.module';
import { EnrollmentModule } from './services/enrollments/enrollments/enrollment.module';
import { GradeModule } from './services/enrollments/grades/grade.module';
import { BuildingModule } from './services/infrastructures/buildings/building.module';
import { CampusModule } from './services/infrastructures/campuses/campus.module';
import { RoomTypeModule } from './services/infrastructures/room-types/room-type.module';
import { RoomModule } from './services/infrastructures/rooms/room.module';
import { ScheduleModule } from './services/schedules/schedules/schedule.module';
import { NotificationsModule } from './services/notifications/notifications.module';
import { UserModule } from './services/users/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AttendanceModule,
    PaymentMethodModule,
    PaymentModule,
    CourseModule,
    ProgramModule,
    EnrollmentModule,
    GradeModule,
    BuildingModule,
    CampusModule,
    RoomTypeModule,
    RoomModule,
    ScheduleModule,
    StudentModule,
    UserModule,
    InstructorModule,
    AuthenticationModule,
    AuthorizationModule,
    AttendanceModule,
    NotificationsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
