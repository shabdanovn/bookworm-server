import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Controller('conversations')
export class ConversationsController {

  constructor(private consService: ConversationsService) {}

  @Post()
  createConversation(@Body() dto: CreateConversationDto){
    return this.consService.createConversation(dto)
  }

  @Get(':id')
  getConversationsOfUser(@Param('id') id:string){
    return this.consService.getConversationsOfUser(+id)
  }
}
