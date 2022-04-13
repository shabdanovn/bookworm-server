import { Module } from '@nestjs/common';
import { ChallengeCommentsController } from './challenge-comments.controller';
import { ChallengeCommentsService } from './challenge-comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import { ChallengeComment } from "./challenge-comments.model";
import { Challenge } from "../challenges/challenges.model";

@Module({
  controllers: [ChallengeCommentsController],
  providers: [ChallengeCommentsService],
  imports: [
      SequelizeModule.forFeature([ChallengeComment, User, Challenge]),
      UsersModule,
      AuthModule
  ]
})
export class ChallengeCommentsModule {}
