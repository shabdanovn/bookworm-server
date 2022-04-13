import {ApiProperty} from "@nestjs/swagger";

export class CreatePostCommentDto{
    @ApiProperty({example: 'This is a comment', description: 'Text of a comment'})
    readonly text: string

    @ApiProperty({example: '1', description: 'AuthorId of a comment'})
    readonly authorId: number

    @ApiProperty({example: '1', description: 'Book of a comment'})
    readonly postId: number

    readonly author: string
    readonly authorImg: string
}