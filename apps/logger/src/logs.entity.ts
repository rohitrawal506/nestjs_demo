import { Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity('logss')
export class Logs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    ip : string

    @Column()
    status: string
}