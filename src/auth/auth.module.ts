import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { LocalStretagy } from './local.auth';
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    UsersModule,
    PassportModule.register({defaultStrategy:'local'}),
    JwtModule.register(
      {
        secret:process.env.JWT_SECRET || 'defaultSecret',
        signOptions:{expiresIn:'1h'},
      }
    ),
    MongooseModule.forFeature([{name:'User', schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,LocalStretagy],
})
export class AuthModule {}
