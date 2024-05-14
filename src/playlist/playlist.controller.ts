import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from '../dto/create-playlist.dto';
import { PlayList } from '../entities/playlist.entity';
import { addSongInPlayList } from 'src/dto/add-song-in-playlist';
import { UpdateResult } from 'typeorm';

@Controller('playlist')
export class PlaylistController {
    constructor(
        private playListService : PlaylistService
    ){}

    @Post()
    createPlaylist(
        @Body()playListDto:CreatePlayListDto
    ) : Promise<PlayList>{
        return this.playListService.createPlaylist(playListDto);
    }

    @Post("addsong")
    async addSong(
        @Body()addSongDto:addSongInPlayList
    ): Promise<UpdateResult>
    {
        return await this.addSong(addSongDto);
    }
}
