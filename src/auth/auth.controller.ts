import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";
import { ResponceDto } from "./dto/responce.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}
  
  @Post('register')
  register(@Body() dto:CreateUserDto):Promise<CreateUserDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto:AuthDto): Promise<ResponceDto>{
    return this.authService.login(dto);
  }
}
