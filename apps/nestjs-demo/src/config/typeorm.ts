import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

dotenvConfig({ path: '.env' });
console.log(__dirname,"__dirname__dirname",process.env.TYPEORM_DATABASE)
const config = {
    type: 'postgres',
    host: `${process.env.TYPEORM_HOST}`,
    port: `${process.env.TYPEORM_PORT}`,
    username: `${process.env.TYPEORM_USERNAME}`,
    password: `${process.env.TYPEORM_PASSWORD}`,
    database: `${process.env.TYPEORM_DATABASE}`,
    entities: [User,Product], // Adjust to point to your entity files
    migrations: ['/apps/nestjs-demo/migrations/*.ts'],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);