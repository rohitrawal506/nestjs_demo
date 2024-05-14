import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async createUser(createUser:CreateUserDto):Promise<User>{
        const saltOrRound=10;
        createUser.password=await bcrypt.hash(createUser.password,saltOrRound);
        const user =await this.userRepository.save(createUser);
        delete user.password;
        return user;
    }

    async FindByEmail(data:Partial<User>) : Promise<User>{
        const user = this.userRepository.findOneBy({email:data.email});
        if(!user){
            throw new UnauthorizedException('Could not found user');
        }
        return user;
    }

    async findById(id:number) : Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    
}
