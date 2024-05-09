import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UserDto {
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}