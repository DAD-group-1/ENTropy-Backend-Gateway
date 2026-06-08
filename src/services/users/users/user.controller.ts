import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  PaginationQueryDto,
  UserListResponseDto,
  UserResponseDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all user records',
    description: 'Retrieve a paginated list of all user records.',
  })
  @Get()
  @ApiGlobalResponse(UserListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<UserListResponseDto> {
    return this.userService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a specific user record',
    description: 'Retrieve details of a specific user record by its ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(UserResponseDto)
  findOne(@Param('id') id: string): Observable<UserResponseDto> {
    return this.userService.findOne(id);
  }
}
