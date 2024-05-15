import { Body, Controller, Post} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private userService:UsersService,
        private authService:AuthService
    ){ }

    @Post('signup')
    signup(
        @Body()createUser:CreateUserDto
    ) : Promise<User>{
        return this.authService.signup(createUser);
    }

    @Post("login")
    login(
        @Body()logInDto:LoginDTO
    ) : Promise<{accessToken:string}>{
        return this.authService.login(logInDto);
    }


}