import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface ReadingBookCreationAttrs{
  title:string
  author:string
  genre:string
  img: string
  start_date: string
  userId:number
}

@Table({tableName: 'reading-books'})
export class ReadingBook extends Model<ReadingBook, ReadingBookCreationAttrs>{
  @ApiProperty({example: '1', description: 'ID of book'})
  @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
  id: number

  @ApiProperty({example: 'The old man and the sea', description: 'Title of a book'})
  @Column({type:DataType.STRING})
  title: string

  @ApiProperty({example: 'Heminguay', description: 'Author of a book'})
  @Column({type:DataType.STRING})
  author: string

  @ApiProperty({example: 'detective', description: 'genre of a book'})
  @Column({type: DataType.STRING})
  genre: string

  @ApiProperty({example: 'Image', description: 'Image of a book'})
  @Column({type:DataType.STRING, allowNull: true})
  img: string

  @ApiProperty({example: '25/02/2022', description: 'Start date of reading a book'})
  @Column({type:DataType.STRING, allowNull: true})
  start_date: string

  @ApiProperty({example: '1', description: 'Id of a user of a book'})
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User
}