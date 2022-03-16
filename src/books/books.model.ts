import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface BookCreationAttrs{
    title: string
    author: string
    notes: string
    img: string
    cost: string
    conditions: string
    state: string
    userId: number
}

@Table({tableName: 'books'})
export class Book extends Model<Book, BookCreationAttrs>{
    @ApiProperty({example: '1', description: 'ID of book'})
    @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
    id: number

    @ApiProperty({example: 'The old man and the sea', description: 'Title of a book'})
    @Column({type:DataType.STRING, allowNull: false})
    title: string

    @ApiProperty({example: 'Heminguay', description: 'Author of a book'})
    @Column({type:DataType.STRING, allowNull: false})
    author: string

    @ApiProperty({example: 'New book', description: 'Any notes of owner of a book'})
    @Column({type:DataType.STRING, allowNull: true})
    notes: string

    @ApiProperty({example: 'Image', description: 'Image of a book'})
    @Column({type:DataType.STRING, allowNull: true})
    img: string

    @ApiProperty({example: '250 som', description: 'Cost of a book'})
    @Column({type:DataType.STRING, allowNull: true})
    cost: string

    @ApiProperty({example: 'Bookcrossing', description: 'Other conditions of a book'})
    @Column({type:DataType.STRING, allowNull: true})
    conditions: string

    @ApiProperty({example: '8', description: 'State of a book'})
    @Column({type:DataType.STRING, allowNull: false})
    state: string

    @ApiProperty({example: '1', description: 'Id of a user of a book'})
    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    user: User
}