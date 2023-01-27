import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Watchlist } from "../watchlist/dto/watchlist.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly repo:typeof User) {}

  async findUserByEmail(email:string):Promise<User>{
    try{
      return this.repo.findOne({where:{email},
        include: {
          model:Watchlist,
          required:false
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async hashPassword(password:string):Promise<string>{
    try{
      return bcrypt.hash(password,10);
    } catch (e) {
      throw new Error(e)
    }
  }

  async createUser(dto):Promise<CreateUserDto>{
    try {
      const newUser = {
        firstName: dto.firstName,
        username: dto.username,
        email: dto.email,
        password:await this.hashPassword(dto.password)
      }
      await this.repo.create(newUser);
      return newUser;
    } catch (e) {
      throw new Error(e)
    }
  }
  async publicUser(email:string): Promise<User>{
    try{
      return this.repo.findOne({
        where:{email},
        attributes:{exclude:['password']},
        include: {
          model:Watchlist,
          required:false
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateUser(email:string,dto:UpdateUserDto): Promise<UpdateUserDto>{
    try{
      await this.repo.update(dto,{where: {email}})
      return dto;
    } catch (e) {
      throw new Error(e)
    }
  }
  async deleteUser(email:string):Promise<boolean>{
    try{
      await this.repo.destroy({where:{email}});
      return true;
    } catch (e) {
      throw new Error(e)
    }
  }
}
