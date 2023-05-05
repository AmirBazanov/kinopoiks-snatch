import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeormModuleConfig } from "@kinopoisk-snitch/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "../../../../libs/typeorm/src/lib/entities/users.entity";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TypeormModuleConfig, TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

