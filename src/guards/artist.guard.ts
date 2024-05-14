import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PayloadType } from "src/types/payload.type";

@Injectable()
export class JwtArtistGuard extends AuthGuard("jwt"){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(context);
        return super.canActivate(context);
    }

    handleRequest<TUser = PayloadType>(err: any, user: any): TUser {
        
        console.log(user);
        if(err || (user.artistID===undefined))
            {
                throw err || new UnauthorizedException("could not authorized");
            }
            console.log(user);
        
        if(user.artistId){
            return user;
        }

        //  throw err || new UnauthorizedException("Could not authprized");
    }
} 