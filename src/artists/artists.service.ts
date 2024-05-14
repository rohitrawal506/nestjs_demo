import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private artistRepository : Repository<Artist>,
        private userService : UsersService,
    ){}

    async findArtist(userId:number) : Promise<Artist>{
        return this.artistRepository.findOneBy({user:{id:userId}})
    }

    async createArtist(userId:any) : Promise<Artist>{
        const user1 = await this.userService.findById(userId.id);
        if(!user1)
            {
                throw new Error('User not found');
            }

        return this.artistRepository.save({user:user1});
    }
}
