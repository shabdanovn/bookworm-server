import {Column, DataType, Table, Model, BelongsToMany, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Book} from "../books/books.model";
import {City} from "../cities/cities.model";
import { SavedBooks } from "../saved-books/saved-books.model";

interface UserCreateAttrs{
    email: string
    password: string
    username: string
    fullname: string
    phone: string
    cityName: string
    cityId: number
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttrs>{
    @ApiProperty({example: '1', description: 'ID'})
    @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
    id: number

    @ApiProperty({example: 'densmith@gmail.com', description: 'Email of a user'})
    @Column({type:DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    @Column({type:DataType.STRING, allowNull: false})
    username: string

    @ApiProperty({example: 'Den Smith', description: 'Fullname of a user'})
    @Column({type:DataType.STRING, allowNull: false})
    fullname: string

    @ApiProperty({example: 'img link', description: 'Image'})
    @Column({type:DataType.STRING, allowNull: true})
    img: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    @Column({type:DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: '+996700200222', description: 'Phone of a user'})
    @Column({type:DataType.STRING, allowNull: false})
    phone: string

    @ApiProperty({example: 'true', description: 'Banned or not'})
    @Column({type:DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({example: 'For not respecting others', description: 'Ban reason'})
    @Column({type:DataType.STRING, allowNull: true})
    banReason: string

    @ApiProperty({example: '1', description: 'CityID of a user'})
    @ForeignKey(() => City)
    @Column({type:DataType.INTEGER})
    cityId: number

    @BelongsTo(() => City)
    city: City

    @BelongsToMany(()=> Role, ()=>UserRoles)
    roles: Role[]

    @HasMany(() => Book)
    books: Book[]

    @HasMany(() => SavedBooks)
    savedBooks: SavedBooks[]
}