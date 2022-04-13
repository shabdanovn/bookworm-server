import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import { ChallengeComment} from "./challenge-comments.model";
import { CreateChallengeCommentDto } from "./dto/create-challenge-comment.dto";

@Injectable()
export class ChallengeCommentsService {

    constructor(@InjectModel(ChallengeComment) private commentRepo: typeof ChallengeComment,
                private userService: UsersService) {}

    async createComment(dto: CreateChallengeCommentDto){
        const user = await this.userService.getOneUser(dto.authorId)
        return await this.commentRepo.create({...dto, author: user.username, authorImg: user.img})
    }

    async getAllComments(id:number){
        const comments = await this.commentRepo.findAll({ where:{challengeId: id}})
        return comments.sort((a,b)=> a.id - b.id)
    }

    async deleteComment(id: number){
        await this.commentRepo.destroy({where: {id}})
        return 'Comment was deleted'
    }
}
