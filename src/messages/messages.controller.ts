import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessagesDto } from "./dto/create-messages.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {

  constructor(private messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() dto: CreateMessagesDto){
    return this.messagesService.createMessage(dto)
  }

  @Get(':id')
  getMessages(@Param('id') id:string){
    return this.messagesService.getMessages(+id)
  }
}
