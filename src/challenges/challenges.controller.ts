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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ChallengesService } from "./challenges.service";
import { Challenge } from "./challenges.model";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";

@ApiTags('Challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private challengeService: ChallengesService) {}

  @ApiOperation({summary: 'create a new challenge'})
  @ApiResponse({status: 200, type: Challenge })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  createChallenge(@Body() dto: CreateChallengeDto,
             @UploadedFile() img){
    return this.challengeService.createChallenge(dto, img)
  }

  @ApiOperation({summary: 'get a challenge'})
  @ApiResponse({status: 200, type: Challenge})
  @Get(':id')
  getOneChallenge(@Param('id') id: string){
    return this.challengeService.getOneChallenge(+id)
  }

  @ApiOperation({summary: 'Get user\'s created challenges' })
  @ApiResponse({status:201, type: [Challenge]})
  @UseGuards(JwtAuthGuard)
  @Get('/my-created-challenges/:userId')
  getUsersChallenges(@Param('userId') id: string){
    return this.challengeService.getUsersChallenges(+id)
  }

  @ApiOperation({summary: 'get books'})
  @ApiResponse({status: 200, type: [Challenge]})
  @Get()
  getAllChallenges(){
    return this.challengeService.getAllChallenges()
  }

  @ApiOperation({summary: 'delete a book post'})
  @ApiResponse({status: 200, type: ''})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteChallenge(@Body() data: UpdateChallengeDto){
    this.challengeService.deleteChallenge(data)
    return {message: "Book was deleted"}
  }

  @ApiOperation({summary: 'update a book post'})
  @ApiResponse({status: 200, type: Challenge})
  @UseGuards(JwtAuthGuard)
  @Put('/without-image')
  updateChallenge(@Body() dto: UpdateChallengeDto){
    return this.challengeService.updateChallenge(dto)
  }

  @ApiOperation({summary: 'update a book post with image'})
  @ApiResponse({status: 200, type: Challenge})
  @UseGuards(JwtAuthGuard)
  @Put('/with-image')
  @UseInterceptors(FileInterceptor('img'))
  updateChallengeWithImage(@Body() dto: UpdateChallengeDto,
                      @UploadedFile() img){
    return this.challengeService.updateChallengeWithImage(dto, img)
  }
}
