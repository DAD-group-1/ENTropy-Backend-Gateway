import { CreateUserDto } from '../create-user.dto';

export class RegisterStudentResponseDto {
  user_id: number;
  user: CreateUserDto;
  program_id: number;
  enrollment_year: number;
  status: string;
  address: string;
  city: string;
  zip_code: string;
  emergency_contact: string;
  emergency_phone: string;
}
