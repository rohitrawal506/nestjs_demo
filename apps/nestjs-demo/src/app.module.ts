import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:false,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => (configService.get('typeorm')),
        inject: [ConfigService]
      }
    ),
    UserModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
