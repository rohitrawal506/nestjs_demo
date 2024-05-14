import { IsNotEmpty, IsNumber } from "class-validator";

export class addSongInPlayList{
    @IsNumber()
    @IsNotEmpty()
    "id":number;

    @IsNumber()
    @IsNotEmpty()
    "songId":number;
}