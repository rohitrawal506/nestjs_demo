// // import { Artist } from "src/entities/artist.entity";
// // import { PlayList } from "src/entities/playlist.entity";
// // import { Song } from "src/entities/song.entity";
// // import { User } from "src/entities/users.entity";
// import { DataSource, DataSourceOptions } from "typeorm";

// export const dataSourceOptions : DataSourceOptions = {
//     type:"postgres",
//     host:"localhost",
//     port:5432,
//     username:"postgres",
//     password:"postgres",
//     database:"test1",
//     entities:["dist/src/**/*.entity.js"],
//     // entities:[Song,User,Artist,PlayList],
//     synchronize:false,
//     migrations:["dist/db/migrations/*.js"],
// } 

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;

import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ["dist/src/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const dataSource = new DataSource(config as DataSourceOptions);
