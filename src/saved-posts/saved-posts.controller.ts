import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SavedPostsService } from "./saved-posts.service";
import { CreateSavedPostsDto } from "./dto/create-saved-posts.dto";
import { DeleteSavedPostsDto } from "./dto/delete-saved-posts.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SavedPosts } from "./saved-posts.model";
import { PostModel } from "../posts/posts.model";

@ApiTags('Saved Posts')
@Controller('saved-posts')
export class SavedPostsController {

  constructor(private savedPostsService: SavedPostsService) {}

  @ApiOperation({summary: 'Saving a book'})
  @ApiResponse({status: 201, type: SavedPosts})
  @Post()
  addSavedPost(@Body() dto: CreateSavedPostsDto){
    return this.savedPostsService.addSavedPost(dto)
  }

  @ApiOperation({summary: 'Getting all saved books of a user'})
  @ApiResponse({status: 201, type: [PostModel]})
  @Get(':userId')
  getUsersSavedPosts(@Param('userId') id: string){
    return this.savedPostsService.getUsersSavedPosts(+id)
  }

  @ApiOperation({summary: 'Removing saved book'})
  @ApiResponse({status: 200, type: SavedPosts})
  @Delete()
  removeFromSavedPosts(@Body() dto: DeleteSavedPostsDto){
    return this.savedPostsService.removeFromSavedPosts(dto)
  }
}
