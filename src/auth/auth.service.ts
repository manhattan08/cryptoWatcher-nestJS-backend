import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AppError } from "../errors/errors";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { TokenService } from "../token/token.service";
import { ResponceDto } from "./dto/responce.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UsersService,
    private readonly tokenService: TokenService
  ) {}

  async register(dto:CreateUserDto):Promise<CreateUserDto>{
    try{
      const existUser = await this.userService.findUserByEmail(dto.email);
      if(existUser) throw new BadRequestException(AppError.USER_EXIST);
      return this.userService.createUser(dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async login(dto:AuthDto):Promise<ResponceDto>{
   try{
     const existUser = await this.userService.findUserByEmail(dto.email);
     if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
     const validatePassword = await bcrypt.compare(dto.password,existUser.password);
     if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
     const user = await this.userService.publicUser(dto.email);
     const token = await this.tokenService.generateJwtToken(user);
     return {user,token};
   } catch (e) {
     throw new Error(e);
   }
  }


}
