import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.model";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import { response } from "express";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepo: typeof Comment,
                private userService: UsersService) {}

    async createComment(dto: CreateCommentDto){
        const user = await this.userService.getOneUser(dto.authorId)
        const comment = await this.commentRepo.create({...dto, author: user.username, authorImg: user.img})
        await comment.$set('comments', [])
        return comment
    }


    // async getComment(id:number){
    //     const comment = await this.commentRepo.findAll({ where:{bookId: id}, include: {model: Comment}})
    //     // console.log('Coment:', comment)
    //
    //     comment.map(async item => {
    //         const a = await this.getAllComments(item.id)
    //         // console.log(a)
    //         item.comments = [...a]
    //     })
    //     return comment
    // };

    async getAllComments(id:number){
        // const comments = await this.commentRepo.findAll({ where:{id}, include: {model: Comment}})
        // // console.log('ComentId:', comments)
        //
        // comments.map(async comment => {
        //     const a = await this.getAllComments(comment.id)
        //     console.log('a', a)
        //
        //     comment.comments = [...a]
        //     // this.getAllComments(comment.id).then(response => comment.comments=response)
        //     // comment.save()
        //     // console.log('ASASAS:', this.getAllComments(comment.id))
        // })
        //
        // return comments
        return await this.commentRepo.findAll({ where:{id}, include: {model: Comment}})
    }



    async deleteComment(id: number){
        await this.commentRepo.destroy({where: {id}})
        return 'Comment was deleted'
    }
}
