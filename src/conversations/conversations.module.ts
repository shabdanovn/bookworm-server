import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Conversations } from "./conversations.model";
import { User } from "../users/users.model";
import { UserConversations } from "./user-conversations.model";

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService],
  imports: [
    SequelizeModule.forFeature([Conversations, User, UserConversations])
  ]
})
export class ConversationsModule {}
