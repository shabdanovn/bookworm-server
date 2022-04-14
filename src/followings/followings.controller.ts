import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FollowingsService } from "./followings.service";
import { User } from "../users/users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateFollowingDto } from "./dto/create-following.dto";

@ApiTags('Followings')
@Controller('followings')
export class FollowingsController {
  constructor(private followingService: FollowingsService) {}

  @ApiOperation({summary: 'Follow a user'})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Put('/follow')
  followUser(@Body() dto: CreateFollowingDto){
      return this.followingService.followUser(dto)
  }

  @ApiOperation({summary: 'Unfollow a user'})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Put('/unfollow')
  unfollowUser(@Body() dto: CreateFollowingDto){
      return this.followingService.unfollowUser(dto)
  }

  @ApiOperation({summary: 'get followers of a user'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get('/followers/:userId')
  getFollowers(@Param('userId') id: string){
      return this.followingService.getFollowers(+id)
  }

  @ApiOperation({summary: 'get followings of a user'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get('/followings/:userId')
  getFollowings(@Param('userId') id: string){
      return this.followingService.getFollowings(+id)
  }

  @ApiOperation({summary: 'get friends count of a user'})
  @ApiResponse({status: 200, type: ""})
  @UseGuards(JwtAuthGuard)
  @Get('/friends/:userId')
  getFriendsCount(@Param('userId') id: string){
    return this.followingService.getFriendsCount(+id)
  }
}
