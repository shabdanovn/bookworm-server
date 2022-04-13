import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Book } from "../books/books.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { PostModel } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({summary: 'create a new post'})
  @ApiResponse({status: 200, type: PostModel})
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  createPost(@Body() dto: CreatePostDto,
             @UploadedFile() img){
    return this.postService.createPost(dto, img)
  }

  @ApiOperation({summary: 'get a post'})
  @ApiResponse({status: 200, type: PostModel})
  @Get(':id')
  getOnePost(@Param('id') id: string){
    return this.postService.getOnePost(+id)
  }

  @ApiOperation({summary: 'Get user\'s posts' })
  @ApiResponse({status:201, type: [PostModel]})
  @UseGuards(JwtAuthGuard)
  @Get('/my-posts/:userId')
  getUsersPosts(@Param('userId') id: string){
    return this.postService.getUsersPosts(+id)
  }

  @ApiOperation({summary: 'get books'})
  @ApiResponse({status: 200, type: [PostModel]})
  @Get()
  getAllPosts(){
    return this.postService.getAllPosts()
  }

  @ApiOperation({summary: 'delete a book post'})
  @ApiResponse({status: 200, type: PostModel})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deletePost(@Body() data: DeletePostDto){
    this.postService.deletePost(data)
    return {message: "Post was deleted"}
  }

  @ApiOperation({summary: 'update a post'})
  @ApiResponse({status: 200, type: Book})
  @UseGuards(JwtAuthGuard)
  @Put('/without-image')
  updatePost(@Body() dto: UpdatePostDto){
    return this.postService.updatePost(dto)
  }

  @ApiOperation({summary: 'update a post with image'})
  @ApiResponse({status: 200, type: Book})
  @UseGuards(JwtAuthGuard)
  @Put('/with-image')
  @UseInterceptors(FileInterceptor('img'))
  updatePostWithImage(@Body() dto: UpdatePostDto,
                      @UploadedFile() img){
    return this.postService.updatePostWithImage(dto, img)
  }
}
