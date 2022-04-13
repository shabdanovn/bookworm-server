import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { PostComment } from "../post_comments/post-comments.model";

interface PostCreationAttrs{
  img: FileList|string
  description: string
  userId: number
}


@Table({tableName: 'posts'})
export class PostModel extends Model<PostModel, PostCreationAttrs>{
  @ApiProperty({example: '1', description: 'ID of post'})
  @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
  id: number

  @ApiProperty({example: 'Image', description: 'Image of a post'})
  @Column({type:DataType.STRING})
  img: string

  @ApiProperty({example: 'New post', description: 'Any description of post'})
  @Column({type: DataType.TEXT})
  description: string

  @ApiProperty({example: '1', description: 'Id of a user of a book'})
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => PostComment)
  comments: PostComment[]
}