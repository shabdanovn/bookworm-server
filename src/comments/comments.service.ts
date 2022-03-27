import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.model";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepo: typeof Comment,
                private userService: UsersService) {}

    async createComment(dto: CreateCommentDto){
        console.log(dto)
        const user = await this.userService.getOneUser(dto.authorId)
        const comment = await this.commentRepo.create({...dto, author: user.username, authorImg: user.img})
        await comment.$set('comments', [])
        return comment
    }

    async getAllComments(id:number){
        const comments = await this.commentRepo.findAll({ where:{bookId: id}, include: {model: Comment}})
        return comments.sort((a,b)=> a.id - b.id)
    }

    async deleteComment(id: number){
        await this.commentRepo.destroy({where: {id}})
        return 'Comment was deleted'
    }
}
