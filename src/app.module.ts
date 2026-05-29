import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { StudentModule } from './users/students/student.module';
import { InstructorModule } from './users/instructors/instructor.module';
import { AuthenticationModule } from './users/authentication/authentication.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    StudentModule,
    InstructorModule,
    AuthenticationModule,
  ],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
