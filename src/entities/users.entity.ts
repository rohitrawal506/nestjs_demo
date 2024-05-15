import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayList } from "./playlist.entity";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"firstname"})
    firstName : string;

    @Column({name:"lastname"})
    lastName : string;

    @Column({unique:true})
    email : string;

    @Column()
    @Exclude()
    password : string;

    @OneToMany(()=>PlayList,(playlist)=>playlist.user)
    playLists : PlayList[];

    @Column({name:"phone_number"})
    phoneNumber: string;
    
}