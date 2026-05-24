export class CreateUserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: Date;
  campus_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
