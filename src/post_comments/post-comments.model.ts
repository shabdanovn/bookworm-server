import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";
import { PostModel } from "../posts/posts.model";

interface PostCommentCreationAttrs{
    text: string
    authorId: number
    postId: number
    author: string
    authorImg: string
}

@Table({tableName: 'post_comments'})
export class PostComment extends Model<PostComment, PostCommentCreationAttrs>{

    @ApiProperty({example: '1', description: 'Id of a comment'})
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id:number

    @ApiProperty({example: 'This is a comment', description: 'Text of a post comment'})
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

    @ApiProperty({example: '1', description: 'Post of a comment'})
    @ForeignKey(()=> PostModel)
    @Column({type: DataType.INTEGER})
    postId:number

    @BelongsTo(() => PostModel)
    post: PostModel

    @BelongsTo(() => User)
    user: User
}