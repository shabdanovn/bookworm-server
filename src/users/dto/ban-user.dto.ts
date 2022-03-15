import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto{
    @ApiProperty({example: 'For not respecting', description:"Ban reason"})
    readonly banReason: string

    @ApiProperty({example: '1', description:'ID of a user'})
    readonly userId: number
}