import { ApiProperty } from '@nestjs/swagger';

export class RegisterTeacherRequestDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  campus_id: number;
  department_id: number;
  hire_date: Date;
  specialization_id: number;
}
