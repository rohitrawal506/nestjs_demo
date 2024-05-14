import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlaylistModule, 
    UsersModule, 
    AuthModule, 
    ArtistsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(private dataSource:DataSource){
    console.log(dataSource.driver.database)
  }
}
