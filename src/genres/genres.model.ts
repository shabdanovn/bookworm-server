import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Book} from "../books/books.model";
import {GenreBooks} from "./genre-books.model";

interface GenreCreationAttr{
    name: string
}
@Table({tableName: 'genres'})
export class Genre extends Model<Genre, GenreCreationAttr>{

    @ApiProperty({example: '1', description: 'ID of genre'})
    @Column({type: DataType.INTEGER, primaryKey: true, allowNull: false, unique: true, autoIncrement: true})
    id: number

    @ApiProperty({example: 'Detective', description: 'name of genre'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @BelongsToMany(()=> Book, () => GenreBooks)
    books: Book[]
}