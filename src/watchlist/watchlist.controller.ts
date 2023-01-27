import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchlistDto } from "./dto/watchlist.dto";
import { JwtAuthGuard } from "../guards/jwt-guard";
import { CreateAssetResponce } from "./responce";

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto:WatchlistDto, @Req() request) : Promise<CreateAssetResponce> {
    const user = request.user;
    return this.watchlistService.createAsset(user,assetDto);
  }

  @Get('get-all')
  getAllAssets(){
    return
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') id:string,@Req() request): Promise<boolean>{
    const userId = request.user.user.id;
    return this.watchlistService.deleteAsset(userId,id);
  }
}
