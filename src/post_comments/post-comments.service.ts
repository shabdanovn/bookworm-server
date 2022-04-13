import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import { PostComment } from "./post-comments.model";
import { CreatePostCommentDto } from "./dto/create-post-comment.dto";

@Injectable()
export class PostCommentsService {

    constructor(@InjectModel(PostComment) private commentRepo: typeof PostComment,
                private userService: UsersService) {}

    async createComment(dto: CreatePostCommentDto){
        const user = await this.userService.getOneUser(dto.authorId)
        return await this.commentRepo.create({...dto, author: user.username, authorImg: user.img})
    }

    async getAllComments(id:number){
        const comments = await this.commentRepo.findAll({ where:{postId: id}})
        return comments.sort((a,b)=> a.id - b.id)
    }

    async deleteComment(id: number){
        await this.commentRepo.destroy({where: {id}})
        return 'Comment was deleted'
    }
}
