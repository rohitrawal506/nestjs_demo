import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { Song } from "./song.entity";

@Entity({name:'playlist'})
export class PlayList{
    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar')
    name : string;

    @ManyToOne(()=>User,(user)=>user.playLists)
    @JoinColumn(
        {
            name:'user_id',
            referencedColumnName:'id'
        }
    )
    user : User;

    @ManyToMany(()=>Song,(song)=>song.playLists)
    @JoinTable(
        {
            name:'playlist_song',
            joinColumn:{name:'playlist_id',referencedColumnName:'id'},
            inverseJoinColumn:{name:'song_id',referencedColumnName:'id'}
        }
    )
    songs : Song[];
}