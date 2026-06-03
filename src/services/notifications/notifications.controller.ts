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
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create a new notification record',
    description: 'Add a new notification record to the system.',
  })
  create(@Body() body: CreateNotificationDto) {
    return this.notificationsService.create(body);
  }

  @ApiOperation({
    summary: 'Get a list of notifications',
    description: 'Retrieve a paginated list of notifications.',
  })
  @Get()
  @ApiGlobalResponse(GetNotificationListResponseDto)
  findAll(@Query(new PaginationPipe()) query: PaginationQueryDto) {
    console.log(query);
    return this.notificationsService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get notifications for a specific user',
    description:
      'Retrieve a paginated list of notifications for a specific user.',
  })
  @Get('/user/:userId')
  @ApiGlobalResponse(GetNotificationListResponseDto)
  findAllForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query(new PaginationPipe()) query: PaginationQueryDto,
  ) {
    return this.notificationsService.findAllForUser(userId, query);
  }

  @ApiOperation({
    summary: 'Get a notification by ID',
    description: 'Retrieve a single notification by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(GetNotificationResponseDto)
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a notification',
    description: 'Update the details of an existing notification.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateNotificationDto })
  @ApiGlobalResponse(NotificationResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @ApiOperation({
    summary: 'Delete a notification',
    description: 'Remove a notification from the system by its unique ID.',
  })
  @Delete(':id')
  @ApiGlobalResponse(DeleteNotificationResponseDto)
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
