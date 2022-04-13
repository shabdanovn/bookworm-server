import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface SavedPostsCreationAttrs{
  userId: number
  postId: number
}

@Table({tableName: 'saved-posts'})
export class SavedPosts extends Model<SavedPosts, SavedPostsCreationAttrs>{

  @ApiProperty({example: '1', description: 'Id of saved post'})
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false})
  id: number

  @ApiProperty({example: '1', description: 'Id of post'})
  @Column({type: DataType.INTEGER})
  postId: number

  @ApiProperty({example: '1', description: 'Id of user'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User
}