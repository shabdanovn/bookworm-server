import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Messages } from "./messages.model";
import { User } from "../users/users.model";
import { Conversations } from "../conversations/conversations.model";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Messages, User, Conversations])
  ]
})
export class MessagesModule {}
