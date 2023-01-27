import { Body, Controller, Delete, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../guards/jwt-guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto:UpdateUserDto,@Req() request): Promise<UpdateUserDto>{
    const user = request.user;
    return this.usersService.updateUser(user.email,updateDto);
 }

 @UseGuards(JwtAuthGuard)
 @Delete()
 deleteUser(@Req() request):Promise<boolean>{
    const user = request.user;
    return this.usersService.deleteUser(user.user.email)
 }

}
