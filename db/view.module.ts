import { Module } from '@nestjs/common';
import { DataBaseService } from './view.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWithPlayList } from 'src/entities/user_with_playlist.entity';
import { ViewController } from './view.controller';
import { ArtistSongEntity } from 'src/entities/artist-song.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserWithPlayList,ArtistSongEntity])],
  providers: [DataBaseService],
  controllers:[ViewController],
  exports: [DataBaseService],
})
export class DatabaseModule {}