import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChallengesUsersService } from "./challenges-users.service";
import { CreateChallengesUsersDto } from "./dto/create-challenges-users.dto";
import { Challenge } from "../challenges/challenges.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ChallengesUsers } from "./challenges-users.model";
import { User } from "../users/users.model";

@ApiTags('ChallengesUsers')
@Controller('challenges-users')
export class ChallengesUsersController {
  constructor(private challengesUsersService: ChallengesUsersService) {}

  @ApiOperation({summary: 'add user to challenge'})
  @ApiResponse({status: 201, type: ChallengesUsers})
  @UseGuards(JwtAuthGuard)
  @Post()
  addUserToChallenge(@Body() dto: CreateChallengesUsersDto){
    return this.challengesUsersService.addUserToChallenge(dto)
  }

  @ApiOperation({summary: 'get one user\'s challenges'})
  @ApiResponse({status: 200, type: [Challenge]})
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUsersChallenges(@Param('userId') id: string){
    return this.challengesUsersService.getUsersChallenges(+id)
  }

  @ApiOperation({summary: 'get one challenge\'s users/members'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get('/challenge-users/:challengeId')
  getChallengeUsers(@Param('challengeId') id: string){
    return this.challengesUsersService.getChallengeUsers(+id)
  }

  @ApiOperation({summary: 'removing user from challenge'})
  @ApiResponse({status: 200, type: ''})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeUserChallenge(@Param('id') id: string){
    return this.challengesUsersService.removeUserChallenge(+id)
  }
}
