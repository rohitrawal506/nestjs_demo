import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DataBaseService } from './view.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: DataBaseService) {}

  @Post('create')
  async createViewForUserPlaylist(): Promise<void> {
    await this.viewService.createViewForUserPlaylist();
  }

  @UseGuards(JwtAuthGuard)
    @Get("user_playlist")
    async getUserPlaylist() : Promise<any>
    {
        return this.viewService.getUserWithPlayList();
    }

    @UseGuards(JwtAuthGuard)
    @Get("artist_song")
    async getArtistSong() : Promise<any>{
        return this.viewService.getArtistWithSong();
    }
}
