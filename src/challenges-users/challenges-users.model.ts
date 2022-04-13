import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface ChallengesUsersCreationAttrs{
  userId: number
  challengeId: number
}

@Table({tableName: 'challenges-users'})
export class ChallengesUsers extends Model<ChallengesUsers, ChallengesUsersCreationAttrs>{
  @ApiProperty({example: '1', description: 'ID of challenge-user'})
  @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
  id: number

  @ApiProperty({example: '1', description: 'Id of a user of challenge'})
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number

  @ApiProperty({example: '1', description: 'Id of a challenge'})
  @Column({type:DataType.INTEGER})
  challengeId: number

  @BelongsTo(() => User)
  user: User
}