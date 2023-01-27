import { IsNumber, IsString } from "class-validator";

export class CreateAssetResponce {
  @IsNumber()
  user: number;

  @IsString()
  name:string;

  @IsString()
  assetId:string;
}