import { Module } from '@nestjs/common';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { ConfigModule } from '@nestjs/config';
import { PersonsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([PersonsEntity]),
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
