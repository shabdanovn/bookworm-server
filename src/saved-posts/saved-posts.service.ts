import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateSavedPostsDto } from "./dto/create-saved-posts.dto";
import { InjectModel } from "@nestjs/sequelize";
import {SavedPosts } from "./saved-posts.model";
import { DeleteSavedPostsDto } from "./dto/delete-saved-posts.dto";
import { Op } from "sequelize";
import { PostsService } from "../posts/posts.service";

@Injectable()
export class SavedPostsService {

  constructor(@InjectModel(SavedPosts) private savedPostsRepo: typeof SavedPosts,
              private postsService: PostsService) {}

  async addSavedPost(dto: CreateSavedPostsDto){
    return await this.savedPostsRepo.create(dto)

  }

  async getUsersSavedPosts(id: number){
    const usersSavedPostsIds = await this.savedPostsRepo.findAll({where: {userId: id}})
    const array = usersSavedPostsIds.map(item => item.postId)
    return await this.postsService.getSavedPosts(array)
  }

  async removeFromSavedPosts(dto: DeleteSavedPostsDto){
    try{
      return await this.savedPostsRepo.destroy({where: {
          [Op.and]: [
            {userId: dto.userId},
            {postId: dto.postId}
          ]
        }})
    }catch (e) {
      throw new HttpException("No saved was found", HttpStatus.NOT_FOUND)
    }
  }
}
