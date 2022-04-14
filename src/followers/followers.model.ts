import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface FollowingsModelCreationAttrs{
  userId: number
  followerId: number
}

@Table({tableName: 'followers'})
export class FollowersModel extends Model<FollowersModel, FollowingsModelCreationAttrs>{
  @ApiProperty({example: '1', description: 'ID'})
  @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
  id: number

  @ApiProperty({example: '1', description: 'user ID'})
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number

  @ApiProperty({example: '1', description: 'follwoing ID'})
  @Column({type:DataType.INTEGER})
  followerId: number

  @BelongsTo(() => User)
  user: User
}