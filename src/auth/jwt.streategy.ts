import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Constants } from "./constants";
import { PayloadType } from "src/types/payload.type";

@Injectable()
export class JwtStretagy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : Constants.secret 
        });
    }

    async validate(payload:PayloadType){
        return {
            userID:payload.userId,
            email:payload.email,
            artistID:payload.artistId,
        };
    }
}