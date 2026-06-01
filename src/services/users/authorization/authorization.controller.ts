import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {
  CreateRoleDto,
  DeleteRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@dad-group-1/backend-common';
import { Observable } from 'rxjs';
import { assertObjectIsNumber } from '../../../helpers/check-utils';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ type: RoleResponseDto })
  create(@Body() body: CreateRoleDto): Observable<RoleResponseDto> {
    return this.authorizationService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ type: [RoleResponseDto] })
  findAll(): Observable<RoleResponseDto[]> {
    return this.authorizationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ type: RoleResponseDto })
  findOne(@Param('id') id: string): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ type: RoleResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.update(Number(id), updateRoleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    const body: DeleteRoleDto = { role_id: Number(id) };
    return this.authorizationService.remove(body);
  }
}
