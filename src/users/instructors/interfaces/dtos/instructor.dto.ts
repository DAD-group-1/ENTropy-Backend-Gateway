import { CreateUserDto } from '../../../users/interfaces/dtos/create-user.dto';
import { InstructorStatus } from '../instructor.interface';
import { PartialType } from '@nestjs/swagger';

export class CreateInstructorDto extends CreateUserDto {
  user_id: number;
  department_id: number;
  status: InstructorStatus;
  hire_date: Date;
  specialization_id: number;
}

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {}