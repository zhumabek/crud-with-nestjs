import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {typeOrmConfig} from "./config/database/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      ConfigModule.forRoot()
  ]
})
export class AppModule {}
