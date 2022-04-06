import { Body, Get, Injectable, Post } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Conversations } from "./conversations.model";
import { Op } from "sequelize";

@Injectable()
export class ConversationsService {

  constructor(@InjectModel(Conversations) private convRepo: typeof Conversations) {}

  async createConversation(dto: CreateConversationDto){
    const [user, created] = await this.convRepo.findOrCreate({where:{
        [Op.or]: [
          {[Op.and]: [
              {senderId: dto.senderId},
              {receiverId: dto.receiverId}
            ]},
          {[Op.and]: [
              {senderId: dto.receiverId},
              {receiverId: dto.senderId}
            ]}
        ]
      },
      defaults: dto
    })
    return user
  }

  async getConversationsOfUser(id:number){
    return await this.convRepo.findAll({where:{
        [Op.or]: [
          {senderId: id},
          {receiverId: id}
        ]
      }})
  }
}
