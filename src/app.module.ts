import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {StudentModule} from './users/students/student.module';
import {InstructorModule} from './users/instructors/instructor.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        StudentModule,
        InstructorModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
