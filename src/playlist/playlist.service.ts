import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from '../entities/playlist.entity';
import { Repository} from 'typeorm';
import { User } from '../entities/users.entity';
import { Song } from 'src/entities/song.entity';
import { CreatePlayListDto } from '../dto/create-playlist.dto';
// import { addSongInPlayList } from 'src/dto/add-song-in-playlist';

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

    async addSongToPlaylist(playlistId: number, songId: number): Promise<PlayList> {
      const playlist = await this.findById(playlistId);
      const song = await this.songRepository.findOne({where:{id:songId}});
      if (!playlist || !song) {
          throw new Error('Playlist or Song not found');
      }

      playlist.songs.push(song);
      await this.playlistRepository.save(playlist);

      return playlist;
  }
    // async addSong(addSongDto: addSongInPlayList): Promise<PlayList> {
    //     const playList = await this.findById(addSongDto.id);

        // console.log(addSongDto);
      
        // if (!playList) {
        //   throw new Error("PlayList Not Found");
        // }
      
        // const songs: Song[] = playList.songs;

        // console.log(songs);

        // const song = await this.songRepository.findOneBy({ id: addSongDto.songId });
        // console.log(song);

        // if (!song) {
        //   throw new Error("Song not found");
        // }
      
        // const foundSong = songs.find(s => s.id === song.id);
        // console.log("FoundSong....");
        // console.log(foundSong);
      
        // if (foundSong) {
        //   throw new Error("Song is already in the Playlist");
        // }
      
        // playList.songs.push(song);
      
        // return await this.playlistRepository.update(addSongDto.id, { songs: playList.songs });
      //   return playList;
      // }

      async findById(id:number) : Promise<PlayList>{
        return this.playlistRepository
                   .createQueryBuilder('playList')
                   .leftJoinAndSelect('playList.user','user')
                   .leftJoinAndSelect('playList.songs','songs')
                   .where('playList.id = :id',{id})
                   .getOne()
    }
      

}
