import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StudentModule } from './users/students/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    UsersModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
