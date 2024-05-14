import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logs } from './logs.entity';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true,
      load: [typeorm]
    }), TypeOrmModule.forRootAsync(
    {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm1')),
      inject: [ConfigService]
    }
  ),TypeOrmModule.forFeature([Logs])],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule { }
