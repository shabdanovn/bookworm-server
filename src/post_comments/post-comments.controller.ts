import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PostCommentsService} from "./post-comments.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { CreatePostCommentDto } from "./dto/create-post-comment.dto";
import { PostComment } from "./post-comments.model";

@ApiTags('PostComments')
@Controller('post-comments')
export class PostCommentsController {

    constructor(private postCommentsService: PostCommentsService) {}

    @ApiOperation({summary: 'Create a comment'})
    @ApiResponse({status:201, type: PostComment})
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() dto: CreatePostCommentDto){
        return this.postCommentsService.createComment(dto)
    }

    @ApiOperation({summary: 'Get comments'})
    @ApiResponse({status:201, type: [PostComment]})
    @Get(':postId')
    getAllComments(@Param('postId') id: string){
        return this.postCommentsService.getAllComments(+id)
    }

    @ApiOperation({summary: 'Delete a comment'})
    @ApiResponse({status:201, type: ""})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteComment(@Param('id') id: string){
        return this.postCommentsService.deleteComment(+id)
    }
}
