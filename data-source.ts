// import { Artist } from "src/entities/artist.entity";
// import { PlayList } from "src/entities/playlist.entity";
// import { Song } from "src/entities/song.entity";
// import { User } from "src/entities/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"postgres",
    database:"test",
    entities:["dist/**/*.entity.js"],
    // entities:[Song,User,Artist,PlayList],
    synchronize:true,
    // migrations:["dist/db/migration/*.js"],
} 

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;