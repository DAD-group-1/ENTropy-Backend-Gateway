import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto } from './users/interfaces/dtos/create-user.dto';
import { User } from './users/interfaces/user.interface';
import { UpdateUserDto } from './users/interfaces/dtos/update-user.dto'; // Import the User interface from your service

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.usersService.create(createUserDto);
  }

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
}
