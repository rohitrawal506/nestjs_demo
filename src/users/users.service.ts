// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { UserDto } from './user.dto'; // Import the UserDto


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async createUser(userDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);
        // await createdUser.hashPassword();
        return createdUser.save();
    }

    // async getUser(query: object ): Promise<User> {
    //     return this.userModel.findOne(query);
    // }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    
    async getUserById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
}
