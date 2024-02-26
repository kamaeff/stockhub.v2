import { IsEmail } from 'class-validator';

export class AddDto {
  chat_id: string;
  username: string;

  @IsEmail()
  email: string;

  fio: string;
  locale: string;
}
