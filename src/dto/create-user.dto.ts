import { IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits long' })
    phoneNumber: string;
}