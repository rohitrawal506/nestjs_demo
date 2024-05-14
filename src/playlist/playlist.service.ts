import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from '../entities/playlist.entity';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/users.entity';
import { Song } from 'src/entities/song.entity';
import { CreatePlayListDto } from '../dto/create-playlist.dto';
import { addSongInPlayList } from 'src/dto/add-song-in-playlist';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(PlayList)
        private playlistRepository:Repository<PlayList> ,
        @InjectRepository(User)
        private userRepository:Repository<User> ,
        @InjectRepository(Song)
        private songRepository:Repository<Song> ,
    ){}

    async createPlaylist(createplayList:CreatePlayListDto) : Promise<PlayList>{
        const playList=new PlayList();
        playList.name=createplayList.name;

        const songs=await this.songRepository.findByIds(createplayList.songs);
        playList.songs=songs;

        const user=await this.userRepository.findOneBy({id:createplayList.user});
        playList.user=user;

        return this.playlistRepository.save(playList);

    }

    async addSong(addSongDto: addSongInPlayList): Promise<UpdateResult> {
        const playList = await this.playlistRepository.findOneBy({ id: addSongDto.id });

        console.log(playList);
      
        if (!playList) {
          throw new Error("PlayList Not Found");
        }
      
        const songs: Song[] = playList.songs;

        console.log(songs);

        const song = await this.songRepository.findOneBy({ id: addSongDto.songId });
        console.log(song);

        if (!song) {
          throw new Error("Song not found");
        }
      
        const foundSong = songs.find(s => s.id === song.id);
        console.log("FoundSong....");
        console.log(foundSong);
      
        if (foundSong) {
          throw new Error("Song is already in the Playlist");
        }
      
        playList.songs.push(song);
      
        return await this.playlistRepository.update(addSongDto.id, { songs: playList.songs });
      }
      

}
