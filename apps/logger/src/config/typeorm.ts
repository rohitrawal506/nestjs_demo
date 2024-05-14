import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });
console.log(__dirname + '/../migrations/*{.ts,.js}')

const config = {
    type: 'postgres',
    host: `${process.env.TYPEORM_HOST}`,
    port: `${process.env.TYPEORM_PORT}`,
    username: `${process.env.TYPEORM_USERNAME}`,
    password: `${process.env.TYPEORM_PASSWORD}`,
    database: 'sal_logs',
    entities:  [__dirname + '/../**/*.entity{.ts,.js}'], // Adjust this path for your entities
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm1', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);