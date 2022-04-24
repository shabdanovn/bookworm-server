import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";
import { Challenge } from "../challenges/challenges.model";

interface ChallengeCommentCreationAttrs{
    text: string
    authorId: number
    challengeId: number
    author: string
    authorImg: string
}

@Table({tableName: 'challenge_comments'})
export class ChallengeComment extends Model<ChallengeComment, ChallengeCommentCreationAttrs>{

    @ApiProperty({example: '1', description: 'Id of a comment'})
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id:number

    @ApiProperty({example: 'This is a comment', description: 'Text of a challenge comment'})
    @Column({type: DataType.TEXT})
    text: string

    @ApiProperty({example: '1', description: 'AuthorId of a comment'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    authorId:number

    @ApiProperty({example: 'John', description: 'Author of a comment'})
    @Column({type: DataType.STRING})
    author:string

    @ApiProperty({example: 'link', description: 'Author avatar of a comment'})
    @Column({type: DataType.STRING})
    authorImg:string

    @ApiProperty({example: '1', description: 'Challenge of a comment'})
    @ForeignKey(()=> Challenge)
    @Column({type: DataType.INTEGER})
    challengeId:number

    @BelongsTo(() => Challenge)
    challenge: Challenge

    @BelongsTo(() => User)
    user: User
}