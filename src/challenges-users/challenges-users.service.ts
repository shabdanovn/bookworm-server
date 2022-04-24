import { Body, Delete, Get, Injectable, Param } from "@nestjs/common";
import { CreateChallengesUsersDto } from "./dto/create-challenges-users.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ChallengesUsers } from "./challenges-users.model";
import { ChallengesService } from "../challenges/challenges.service";

@Injectable()
export class ChallengesUsersService {
  constructor(@InjectModel(ChallengesUsers) private challUserRepo: typeof ChallengesUsers,
              private challengesService: ChallengesService) {}

  async addUserToChallenge(dto: CreateChallengesUsersDto){
    return await this.challUserRepo.create(dto)
  }

  async getUsersChallenges(id: number){
    const userChallenges = await this.challUserRepo.findAll({where: {userId: id}})
    const arrayIds = userChallenges.map(item=> item.challengeId)
    return this.challengesService.getUserChallenges(arrayIds)
  }

  async getChallengeUsers(id: number){
    const usersInChallenge = await this.challUserRepo.findAll({
      where: {challengeId: id},
      include: {all: true}
    })
    return usersInChallenge
  }

  async removeUserChallenge(dto: CreateChallengesUsersDto){
    return await this.challUserRepo.destroy({where: {
        userId: dto.userId,
        challengeId: dto.challengeId
      }})
  }
}
