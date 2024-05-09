import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true
    }),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configservivce: ConfigService): TypeOrmModuleOptions => {
          return {
            type: 'postgres',
            host: configservivce.get('TYPEORM_HOST'),
            port: configservivce.get('TYPEORM_PORT'),
            username: configservivce.get('TYPEORM_USERNAME'),
            password: configservivce.get('TYPEORM_PASSWORD'),
            database: configservivce.get('TYPEORM_DATABASE'),
            synchronize: false,
            autoLoadEntities: true,
            entities: ["dist/**/*.entity{.ts,.js}"],
            migrations: ["dist/migrations/*{.ts,.js}"],
          }
        },
        inject: [ConfigService]
      }
    ),
    UserModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
