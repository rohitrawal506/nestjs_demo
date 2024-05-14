import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/entities/artist.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Artist]),
    UsersModule
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports:[ArtistsService]
})
export class ArtistsModule {}
