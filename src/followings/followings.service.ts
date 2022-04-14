import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { FollowingsModel } from "./followings.model";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { FollowersService } from "../followers/followers.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class FollowingsService {

  constructor(@InjectModel(FollowingsModel) private followRepo: typeof FollowingsModel,
              private followerService: FollowersService,
              private userService: UsersService) {}

  async followUser(dto: CreateFollowingDto){
    await this.followRepo.create(dto)
    await this.followerService.followUser({userId: dto.followingId, followerId: dto.userId})
    return 'You followed'
  }

  async unfollowUser(dto: CreateFollowingDto){
    await this.followRepo.destroy({where: {userId: dto.userId, followingId: dto.followingId}})
    await this.followerService.unfollowUser({userId: dto.followingId, followerId: dto.userId})
    return 'You unfollowed'
  }

  async getFollowers(id: number){
    return this.followerService.getFollowers(id)
  }

  async getFollowings( id: number){
    const followings = await this.followRepo.findAll({where: {userId: id}})
    const ids = followings.map(item=> item.followingId)
    return this.userService.getUsersByIds(ids)
  }

  async getFriendsCount(id: number){
    const followings = await this.getFollowings(id)
    const followers = await this.getFollowers(id)
    return {
      followings: followings.length,
      followers: followers.length
    }
  }
}
