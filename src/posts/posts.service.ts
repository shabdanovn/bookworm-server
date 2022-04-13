import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { Op } from "sequelize";
import { PostModel } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostModel) private postRepo: typeof PostModel,
              private filesService: FilesService) {}

  async createPost(dto: CreatePostDto, image: any){
    const fileName = await this.filesService.createFile(image)
    const post = await this.postRepo.create({...dto, img: fileName})
    await post.$set('comments', [])
    return post
  }

  async getOnePost(id: number){
    return await this.postRepo.findByPk(id, {include: {all: true}})
  }

  async getAllPosts(){
    return await this.postRepo.findAll()
  }

  async getSavedPosts(data: number[]){
    return await this.postRepo.findAll({where: {
        id: {
          [Op.in]: data
        }
      }})
  }

  async getUsersPosts(id:number){
    if(id) return await this.postRepo.findAll({where: {userId: id}})
    throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST)
  }

  async deletePost(data: DeletePostDto){
    try{
      return await this.postRepo.destroy({where: {
          [Op.and]: [
            {id: data.id},
            {userId: data.userId}
          ]
        }})
    }catch (e) {
      throw new HttpException("No user or post was found", HttpStatus.NOT_FOUND)
    }
  }

  async updatePost(dto: UpdatePostDto){
    return await this.postRepo.update(dto, {where: {id:dto.id}})
  }

  async updatePostWithImage(dto: UpdatePostDto, img:any){
    const fileName = await this.filesService.createFile(img)
    return await this.postRepo.update({...dto, img:fileName}, {where: {id: dto.id}})
  }
}
