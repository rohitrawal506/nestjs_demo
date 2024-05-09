import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private  readonly userService:UsersService, private jwtService:JwtService){}

    async validateUser(email:string,password:string) : Promise<any>{
        const user = await this.userService.getUser({email:email});

        if(!user) return null;
        const passwordValid = await bcrypt.compare(password,user.password);
        if(!user)
        {
            throw new NotAcceptableException("could not find user");
        }
        if(user && passwordValid)
        {
            return user;
        }
        return null;
    }

    async login(user:any){
        const payload={userEmail:user.email,sub:user._id};
        return{
            access_token:this.jwtService.signAsync(payload),
        }
    }
}
