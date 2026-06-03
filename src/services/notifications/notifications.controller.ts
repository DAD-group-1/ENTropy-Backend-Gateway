import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  DeleteNotificationResponseDto,
  GetNotificationListResponseDto,
  GetNotificationResponseDto,
  NotificationResponseDto,
  PaginationQueryDto,
  UpdateNotificationDto,
} from '@dad-group-1/backend-common';
import { ApiGlobalResponse } from '../../decorators/api.decorators';
import { PaginationPipe } from '../../pipes/pagination.pipe';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  @ApiGlobalResponse(NotificationResponseDto)
  create(@Body() body: CreateNotificationDto) {
    return this.notificationsService.create(body);
  }

  @Get()
  @ApiGlobalResponse(GetNotificationListResponseDto)
  findAll(@Query(new PaginationPipe()) query: PaginationQueryDto) {
    console.log(query);
    return this.notificationsService.findAll(query);
  }

  @Get('/user/:userId')
  @ApiGlobalResponse(GetNotificationListResponseDto)
  findAllForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query(new PaginationPipe()) query: PaginationQueryDto,
  ) {
    return this.notificationsService.findAllForUser(userId, query);
  }

  @Get(':id')
  @ApiGlobalResponse(GetNotificationResponseDto)
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateNotificationDto })
  @ApiGlobalResponse(NotificationResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiGlobalResponse(DeleteNotificationResponseDto)
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
