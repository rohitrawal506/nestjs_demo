import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStretagy } from './jwt.streategy';
import { ArtistsModule } from 'src/artists/artists.module';
import {config as dotenvConfig} from  'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register(
      {
        secret:`${process.env.SECRET_KEY}`,
        signOptions:{
          expiresIn:'1d',
        }
      }
    ),
    ArtistsModule
  ],
  providers: [AuthService,JwtStretagy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
