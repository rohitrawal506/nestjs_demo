
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { authConstants } from "./auth.constants";
import { PayloadType } from "./dto/payload.type";
import * as dotenv from "dotenv";

dotenv.config();
@Injectable()
export class LocalStretagy extends PassportStrategy(Strategy){
    
    constructor(){
        console.log(process.env.JWT_SECRET)
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey:process.env.JWT_SECRET,
        });
    }

    async validate(payload:PayloadType){
        return{
            email:payload.email,
            age:payload.age,
            isAdmin:payload.isAdmin
        };
    }
}