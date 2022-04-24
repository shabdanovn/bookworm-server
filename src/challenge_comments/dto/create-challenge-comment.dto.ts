import {ApiProperty} from "@nestjs/swagger";

export class CreateChallengeCommentDto {
    @ApiProperty({example: 'This is a comment', description: 'Text of a comment'})
    readonly text: string

    @ApiProperty({example: '1', description: 'AuthorId of a comment'})
    readonly authorId: number

    @ApiProperty({example: '1', description: 'Book of a comment'})
    readonly challengeId: number

    @ApiProperty({example: 'username', description: 'Username of author of a comment'})
    readonly author: string

    @ApiProperty({example: 'image link', description: 'image of author of a comment'})
    readonly authorImg: string
}