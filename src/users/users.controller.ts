import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { AdminGuard } from 'src/auth/jwt-adminguard';
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    
    @Post() // users/
    @UseGuards(AdminGuard)
    async createUser(@Body() userDto:UserDto) : Promise<User> {
        const saltOrRound=10;
        const hashPassword=await bcrypt.hash(userDto.password,saltOrRound);
        const user=({
            ...userDto,
            password:hashPassword
        });
        return this.userService.createUser(user);
    }

    @Get()
    async getAllUsers() : Promise<User[]>{
        return this.userService.getAllUsers();
    }



    @Get(':id')
    async getUserById(@Param('id') id:string):Promise<User>{
        const user = await this.userService.getUserById(id);
        return user;
    }
    
    
}
