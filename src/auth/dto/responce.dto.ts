import { IsEmail, IsString } from "class-validator";

export class ResponceDto {
  user:UserResponce
  @IsString()
  token:string;
}

class UserResponce {
  @IsString()
  firstName:string;
  @IsEmail()
  email:string;
  @IsString()
  username:string;
}