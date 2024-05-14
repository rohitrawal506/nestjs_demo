import { Body, Controller, HttpException, HttpStatus, Param, ParseIntPipe, Scope, UseGuards } from '@nestjs/common';
import { Post, Get, Put, Delete } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from '../dto/create-song.dto';
// import { Connection } from 'src/constants/connection';
import { Song } from '../entities/song.entity';
import { UpdateSongDto } from '../dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { JwtArtistGuard } from '../guards/artist.guard';

@Controller({path:'songs',scope:Scope.REQUEST})
export class SongsController {

    constructor(
      private readonly songService:SongsService,
    //   @Inject('CONNECTION')
    //   private connection:Connection,
    ){
        // console.log(`This is a connectiomn ${this.connection.CONNECTION_STRING}`);
    }
    
  @Post()
  @UseGuards(JwtArtistGuard)
  create(@Body() createSongDto:CreateSongDto) : Promise<Song> {
    return this.songService.create(createSongDto);
  }

  
  @Get()
  @UseGuards(JwtArtistGuard)
  findAll() {
    try{
      return this.songService.findAll();
    }catch(e){
      throw new HttpException('Server Error',
                              HttpStatus.INTERNAL_SERVER_ERROR,
                              {
                                cause:e,
                              }
                            );
    }
    
  }

  @Get(':id')
  findOne(
    @Param('id',new ParseIntPipe({errorHttpStatusCode : HttpStatus.NOT_ACCEPTABLE}))id: number,
  ) {
    return this.songService.findById(id);
  }



  @Put(':id')
  update(
    @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}))id:number,
    @Body()updateSong:UpdateSongDto
  ) : Promise<UpdateResult> {
    return this.songService.update(id,updateSong);
  }


  @Delete(':id')
  delete(@Param('id',new ParseIntPipe({errorHttpStatusCode : HttpStatus.NOT_ACCEPTABLE}))id:number) {
    return this.songService.removeById(id);
  }
}
