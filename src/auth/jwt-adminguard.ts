import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PayloadType } from "./dto/payload.type";

export class AdminGuard extends AuthGuard("jwt"){

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(context);
        return super.canActivate(context);
    }

    handleRequest<TUser = PayloadType>(err: any, user: any): TUser {
        console.log("data in user :"+user);
        if(err || !user)
            {
                throw err || new UnauthorizedException("could not authorized");
            }
            console.log(user);
        
        if(user.isAdmin){
            return user;
        }

        throw err || new UnauthorizedException("Could not authprized");
    }
}