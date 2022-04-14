import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { FollowersModel } from "./followers.model";
import { CreateFollowingDto } from "../followings/dto/create-following.dto";
import { UsersService } from "../users/users.service";
import { CreateFollowersDto } from "./dto/create-followers.dto";

@Injectable()
export class FollowersService {
  constructor(@InjectModel(FollowersModel) private followerRepo: typeof FollowersModel,
              private userService: UsersService) {}

  async followUser(dto: CreateFollowersDto){
    await this.followerRepo.create(dto)
  }

  async unfollowUser(dto: CreateFollowersDto){
    await this.followerRepo.destroy({where: {userId: dto.userId, followerId: dto.followerId}})
  }

  async getFollowers(id: number){
    const followers = await this.followerRepo.findAll({where: {userId: id}})
    const ids = followers.map(item=> item.followerId)
    return this.userService.getUsersByIds(ids)
  }
}
