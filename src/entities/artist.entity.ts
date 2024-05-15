import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User} from "./users.entity";
import { Song } from "./song.entity";

@Entity('artist')
export class Artist{
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(()=>User)
    @JoinColumn({name:'userId',referencedColumnName:'id'})
    user : User;

    @ManyToMany(()=>Song,(song)=>song.artists)
    // @JoinTable(
    //     // {
    //     //     name:'song_artist',
    //     //     joinColumn:{name : 'song_id',referencedColumnName:'id'},
    //     //     inverseJoinColumn:{name : 'artist_id', referencedColumnName:'id'}
    //     // }
    // )
    songs : Song[];
}