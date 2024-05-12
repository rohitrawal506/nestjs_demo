import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    // @UseGuards(LocalAuthGuard)
    @Post("login")
    login(
        @Body()logInDto:LoginDto
    ) : Promise<{accessToken:string}>{
        return this.authService.login(logInDto);
    }

}
