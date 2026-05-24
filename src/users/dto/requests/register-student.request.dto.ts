export class RegisterStudentRequestDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  campus_id: number;
  program_id: number;
  enrollment_year: number;
  address: string;
  city: string;
  zip_code: string;
  emergency_contact: string;
  emergency_phone: string;
}
