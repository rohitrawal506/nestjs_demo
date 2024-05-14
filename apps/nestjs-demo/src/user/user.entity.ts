import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert  } from "typeorm";
import * as  bcrypt from 'bcrypt'
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password : string

    @BeforeInsert() async hassPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
}