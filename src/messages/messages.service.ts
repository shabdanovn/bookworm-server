import { Injectable } from "@nestjs/common";
import { CreateMessagesDto } from "./dto/create-messages.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Messages } from "./messages.model";

@Injectable()
export class MessagesService {

  constructor(@InjectModel(Messages) private messagesRepo: typeof Messages) {}

  async createMessage(dto: CreateMessagesDto){
    return await this.messagesRepo.create(dto)
  }

  async getMessages(id:number){
    return await this.messagesRepo.findAll({where: {conversationId: id}})
  }
}
