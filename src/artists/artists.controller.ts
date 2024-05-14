import { Body, Controller, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from 'src/entities/artist.entity';

@Controller('artists')
export class ArtistsController {
    constructor(
        private artistService : ArtistsService,
    ){}

    @Post()
    async createArtist(@Body()userId:any) : Promise<Artist>{
        return await this.artistService.createArtist(userId);
    }
}
