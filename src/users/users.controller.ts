import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service'; // Import the User interface from your service
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/requests/login.request.dto';
import { RegisterStudentRequestDto } from './dto/requests/register-student.request.dto';
import { RegisterTeacherRequestDto } from './dto/requests/register-teacher.request.dto';
import type { RegisterStudentResponseDto } from './dto/responses/register-student.response.dto';
import type { RegisterTeacherResponseDto } from './dto/responses/register-teacher.response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<User> {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<Record<string, string>> {
    console.log('test');
    const result = await this.usersService.sendLogin(body.email, body.password);
    console.log('test');
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }

  @Post('register/student')
  async registerStudent(
    @Body() body: RegisterStudentRequestDto,
  ): Promise<RegisterStudentResponseDto> {
    const result = await this.usersService.sendRegisterStudent(body);
    if (!result) throw new UnauthorizedException('Student registration failed');
    return result;
  }

  @Post('register/teacher')
  async registerTeacher(
    @Body() body: RegisterTeacherRequestDto,
  ): Promise<RegisterTeacherResponseDto> {
    const result = await this.usersService.sendRegisterTeacher(body);
    if (!result) throw new UnauthorizedException('Teacher registration failed');
    return result;
  }
}
