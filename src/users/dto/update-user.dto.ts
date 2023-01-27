import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  firstName:string;

  @IsString()
  username:string;

  @IsEmail()
  email:string;
}