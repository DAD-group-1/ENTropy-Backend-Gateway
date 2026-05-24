import { CreateUserDto } from '../create-user.dto';

export class RegisterTeacherResponseDto {
  user_id: number;
  user: CreateUserDto;
  department_id: number;
  status: string;
  hire_date: Date;
  specialization_id: number;
}
