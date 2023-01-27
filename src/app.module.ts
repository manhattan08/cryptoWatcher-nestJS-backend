import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";
import { TokenModule } from './token/token.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { Watchlist } from "./watchlist/dto/watchlist.model";

@Module({
  imports: [
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'andrey',
    password: 'root',
    database: 'crypto',
    models: [User,Watchlist],
    autoLoadModels:true
  }),
  AuthModule, UsersModule, TokenModule, WatchlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
