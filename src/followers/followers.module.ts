import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { FollowersModel } from "./followers.model";
import { User } from "../users/users.model";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [FollowersService],
  imports: [
    SequelizeModule.forFeature([FollowersModel, User]),
    UsersModule

  ],
  exports: [
    FollowersService
  ]
})
export class FollowersModule {}
