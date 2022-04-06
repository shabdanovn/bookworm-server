import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Messages } from "../messages/messages.model";
import { UserConversations } from "./user-conversations.model";

interface ConversationsCreationAttrs{
  senderId: number
  receiverId: number
}

@Table({tableName: 'conversations'})
export class Conversations extends Model<Conversations, ConversationsCreationAttrs>{

  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, allowNull: true})
  id: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  senderId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  receiverId: number

  @HasMany(() => Messages)
  messages: Messages[]

  @BelongsToMany(() => User, () => UserConversations)
  members: User[]
}