import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {City} from "./cities.model";
import {User} from "../users/users.model";

@Module({
  providers: [CitiesService],
  controllers: [CitiesController],
  imports:[
      SequelizeModule.forFeature([City, User])
  ],
    exports: [CitiesService]
})
export class CitiesModule {}
