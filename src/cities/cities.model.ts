import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface CityCreationAttrs{
    name:string
}

@Table({tableName: 'cities'})
export class City extends Model<City, CityCreationAttrs>{
    @ApiProperty({example: '1', description: 'Id of a city'})
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique:true})
    id:number

    @ApiProperty({example: 'Bishkek', description: 'Name of a city'})
    @Column({type: DataType.STRING, unique: true})
    name: string

    @HasMany(() => User)
    users: User[]
}