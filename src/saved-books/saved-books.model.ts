import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface SavedBooksCreationAttrs{
  userId: number
  bookId: number
}

@Table({tableName: 'saved-books'})
export class SavedBooks extends Model<SavedBooks, SavedBooksCreationAttrs>{

  @ApiProperty({example: '1', description: 'Id of saved book'})
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false})
  id: number

  @ApiProperty({example: '1', description: 'Id of book'})
  @Column({type: DataType.INTEGER})
  bookId: number

  @ApiProperty({example: '1', description: 'Id of user'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User
}