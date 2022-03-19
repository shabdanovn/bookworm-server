import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Book} from "../books/books.model";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";


interface CommentCreationAttrs{
    text: string
    authorId: number
    bookId: number
    commentId: number
    author: string
    authorImg: string
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs>{

    @ApiProperty({example: '1', description: 'Id of a comment'})
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id:number

    @ApiProperty({example: 'This is a comment', description: 'Text of a comment'})
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

    @ApiProperty({example: '1', description: 'Book of a comment'})
    @ForeignKey(()=> Book)
    @Column({type: DataType.INTEGER})
    bookId:number

    @ApiProperty({example: '1', description: 'Parent CommentId of a comment'})
    @ForeignKey(()=> Comment)
    @Column({type: DataType.INTEGER})
    commentId: number

    @BelongsTo(() => Book)
    book: Book

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Comment)
    comments: Comment[]
}