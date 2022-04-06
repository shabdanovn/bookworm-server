import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Conversations } from "../conversations/conversations.model";
import { User } from "../users/users.model";

interface MessageCreationAttrs{
  conversationId: number
  senderId: number
  text: string
}

@Table({tableName: 'messages'})
export class Messages extends Model<Messages, MessageCreationAttrs>{

  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
  id: number

  @Column({type: DataType.TEXT, allowNull: false})
  text: string

  @ForeignKey(() => Conversations)
  @Column({type: DataType.INTEGER})
  conversationId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  senderId: number

  @BelongsTo(() => Conversations)
  conversation: Conversations

  @BelongsTo(() => User)
  user: User
}