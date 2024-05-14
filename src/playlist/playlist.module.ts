import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from 'src/entities/playlist.entity';
import { User } from 'src/entities/users.entity';
import { Song } from 'src/entities/song.entity';

@Module({
  imports :[TypeOrmModule.forFeature([PlayList,User,Song])],
  providers: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule {}
