import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Artist } from "./artist.entity";
import { PlayList } from "./playlist.entity";

@Entity()
export class Song{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique:true})
    title : string

    @ManyToMany(()=>Artist,(artist)=>artist.songs,{cascade:true})
    @JoinTable(
        {
            name : 'song_artist',
            joinColumn:{name:'song_id',referencedColumnName:'id'},
            inverseJoinColumn:{name :'artist_id',referencedColumnName:'id'}
        }
    )
    artists : Artist[];

    @ManyToMany(()=>PlayList,(playlist)=>playlist.songs)
    playLists : PlayList[];

    @Column({type : "date"})
    releasedDate : Date;

    @Column({type : "int"})
    durationInSeconds : number;

    @Column()
    lyrics : string;

    get duration(): string {
        const hours = Math.floor(this.durationInSeconds / 3600);
        const minutes = Math.floor((this.durationInSeconds % 3600) / 60);
        const seconds = this.durationInSeconds % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
}