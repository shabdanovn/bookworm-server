import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ChallengeCommentsService} from "./challenge-comments.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { CreateChallengeCommentDto } from "./dto/create-challenge-comment.dto";
import { ChallengeComment } from "./challenge-comments.model";

@ApiTags('ChallengeComments')
@Controller('challenge-comments')
export class ChallengeCommentsController {

    constructor(private challengeCommentsService: ChallengeCommentsService) {}

    @ApiOperation({summary: 'Create a comment'})
    @ApiResponse({status:201, type: ChallengeComment})
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() dto: CreateChallengeCommentDto){
        return this.challengeCommentsService.createComment(dto)
    }

    @ApiOperation({summary: 'Get comments'})
    @ApiResponse({status:201, type: [ChallengeComment]})
    @Get(':challengeId')
    getAllComments(@Param('challengeId') id: string){
        return this.challengeCommentsService.getAllComments(+id)
    }

    @ApiOperation({summary: 'Delete a comment'})
    @ApiResponse({status:201, type: ""})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteComment(@Param('id') id: string){
        return this.challengeCommentsService.deleteComment(+id)
    }
}
