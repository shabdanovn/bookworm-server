import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Genre} from "./genres.model";
import {Book} from "../books/books.model";

@Table({tableName: 'genres_books', createdAt: false, updatedAt: false})
export class GenreBooks extends Model<GenreBooks>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true})
    id:number

    @ForeignKey(() => Book)
    @Column({type: DataType.INTEGER})
    bookId: number

    @ForeignKey(() => Genre)
    @Column({type: DataType.INTEGER})
    genreId:number
}