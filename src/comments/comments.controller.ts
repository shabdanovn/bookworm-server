import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comments.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @ApiOperation({summary: 'Create a comment'})
    @ApiResponse({status:201, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() dto: CreateCommentDto){
        return this.commentsService.createComment(dto)
    }

    @ApiOperation({summary: 'Get comments'})
    @ApiResponse({status:201, type: [Comment]})
    @Get(':parentCommentId')
    getAllComments(@Param('parentCommentId') id: string){
        // return this.commentsService.getComment(+id)
        return this.commentsService.getAllComments(+id)
    }

    @ApiOperation({summary: 'Delete a comment'})
    @ApiResponse({status:201, type: ""})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteComment(@Param('id') id: string){
        return this.commentsService.deleteComment(+id)
    }

}
