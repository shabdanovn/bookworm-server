import { Module } from '@nestjs/common';
import { ChallengesUsersController } from './challenges-users.controller';
import { ChallengesUsersService } from './challenges-users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { ChallengesUsers } from "./challenges-users.model";
import { User } from "../users/users.model";
import { AuthModule } from "../auth/auth.module";
import { ChallengesModule } from "../challenges/challenges.module";
import { Challenge } from "../challenges/challenges.model";

@Module({
  controllers: [ChallengesUsersController],
  providers: [ChallengesUsersService],
  imports: [
    SequelizeModule.forFeature([ChallengesUsers, User, Challenge]),
    AuthModule,
    ChallengesModule
  ],
  exports: [
    ChallengesUsersService
  ]
})
export class ChallengesUsersModule {}
