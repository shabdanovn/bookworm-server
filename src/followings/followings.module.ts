import { Module } from '@nestjs/common';
import { FollowingsController } from './followings.controller';
import { FollowingsService } from './followings.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { FollowingsModel } from "./followings.model";
import { User } from "../users/users.model";
import { UsersModule } from "../users/users.module";
import { FollowersModule } from "../followers/followers.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [FollowingsController],
  providers: [FollowingsService],
  imports: [
    SequelizeModule.forFeature([FollowingsModel, User]),
    UsersModule,
    FollowersModule,
    AuthModule
  ],

  exports: [
    FollowingsService
  ]
})
export class FollowingsModule {}
