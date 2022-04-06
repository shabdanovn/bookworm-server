import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Conversations } from "./conversations.model";


@Table({tableName: 'user_conversations', timestamps: false})
export class UserConversations extends Model<UserConversations>{

  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, allowNull: true})
  id: number

  @ForeignKey(() => Conversations)
  @Column({type: DataType.INTEGER})
  conversationId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number
}