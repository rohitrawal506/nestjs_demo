import { Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;
}