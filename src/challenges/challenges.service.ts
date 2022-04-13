import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { Challenge } from "./challenges.model";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";
import { Op } from "sequelize";

@Injectable()
export class ChallengesService {
  constructor(@InjectModel(Challenge) private challengeRepo: typeof Challenge,
              private filesService: FilesService) {}

  async createChallenge(dto: CreateChallengeDto, image: any){
    const fileName = await this.filesService.createFile(image)
    const challenge = await this.challengeRepo.create({...dto, img: fileName})
    await challenge.$set('comments', [])
    return challenge
  }

  async getUserChallenges(array: number[]){
    return await this.challengeRepo.findAll({where: {
        id: {
          [Op.in]: array
        }
      }})
  }

  async getOneChallenge(id: number){
    return await this.challengeRepo.findByPk(id, {include: {all: true}})
  }

  async getAllChallenges(){
    return await this.challengeRepo.findAll()
  }

  async getUsersChallenges(id:number){
    if(id) return await this.challengeRepo.findAll({where: {userId: id}})
    throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST)
  }

  async deleteChallenge(data: UpdateChallengeDto){
    try{
      return await this.challengeRepo.destroy({where:{id: data.id}})
    }catch (e) {
      throw new HttpException("No user or book was found", HttpStatus.NOT_FOUND)
    }
  }

  async updateChallenge(dto: UpdateChallengeDto){
    return await this.challengeRepo.update(dto, {where: {id:dto.id}})
  }

  async updateChallengeWithImage(dto: UpdateChallengeDto, img:any){
    const fileName = await this.filesService.createFile(img)
    return await this.challengeRepo.update({...dto, img:fileName}, {where: {id: dto.id}})
  }
}
