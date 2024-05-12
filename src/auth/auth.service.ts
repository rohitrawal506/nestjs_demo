
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './dto/payload.type';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService:JwtService,
    ){}

    async login(loginDto:LoginDto) : Promise<{accessToken:string}>{
        const user = await this.userService.getUser({email:loginDto.email});
        console.log(user);
        const passwordEncode=await bcrypt.compare(
            loginDto.password,user.password
        );

        if(passwordEncode){
            delete user.password;
            // return user;
           
            const payload: PayloadType =  {email:user.email};

            return {
                accessToken:this.jwtService.sign(payload),
            }
        }
        else {
            throw new UnauthorizedException("Password does not match");
        }
    }
}
