import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { ArtistSongEntity } from "src/entities/artist-song.entity";
import { UserWithPlayList } from "src/entities/user_with_playlist.entity";
import {EntityManager, Repository, View } from "typeorm";

@Injectable()
export class DataBaseService{
    constructor(
        @InjectRepository(UserWithPlayList)
        private readonly viewRepository : Repository<View>,
        @InjectRepository(ArtistSongEntity)
        private readonly artistsongRepository : Repository<View>,
        @InjectEntityManager()
        private readonly enitityManager : EntityManager,
    ){}

    async getUserWithPlayList(){
        return this.viewRepository.find();
    }

    async getArtistWithSong(){
        return this.artistsongRepository.find();
    }

    async createViewForUserPlaylist() : Promise<void>{
        await this.enitityManager.query(
            `CREATE VIEW user_playlist AS
            SELECT "user".id AS user_id,
                   "user".firstname AS user_firstname,
                   playlist.id AS playlist_id,
                   playlist.name AS playlist_name
            FROM "user"
            LEFT OUTER JOIN playlist ON playlist.user_id = "user".id;
            `
        );
    }


    
}