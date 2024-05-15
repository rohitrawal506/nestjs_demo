import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from '../dto/create-playlist.dto';
import { PlayList } from '../entities/playlist.entity';
// import { addSongInPlayList } from 'src/dto/add-song-in-playlist';
// import { UpdateResult } from 'typeorm';

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

    // @Post("addsong")
    // addSong(
    //     @Body()addSongDto:addSongInPlayList
    // ): Promise<PlayList>
    // {
    //     return this.addSong(addSongDto);
    // }
    @Post(':playlistId/songs/:songId')
    async addSongToPlaylist(@Param('playlistId') playlistId: number, @Param('songId') songId: number): Promise<any> {
        return this.playListService.addSongToPlaylist(playlistId, songId);
    }

    @Get(":id")
    getPlayListById(
        @Param('id')id:number
    ) : Promise<PlayList>{
        return this.playListService.findById(id);
    }
}
