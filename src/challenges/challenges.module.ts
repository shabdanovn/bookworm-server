import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Challenge } from "./challenges.model";
import { User } from "../users/users.model";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService],
  imports: [
    SequelizeModule.forFeature([Challenge, User]),
    FilesModule,
    AuthModule
  ],
  exports: [
    ChallengesService
  ]
})
export class ChallengesModule {}
