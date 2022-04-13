import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import {Book} from "./books/books.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { GenresModule } from './genres/genres.module';
import * as path from 'path'
import {Genre} from "./genres/genres.model";
import {GenreBooks} from "./genres/genre-books.model";
import { CitiesModule } from './cities/cities.module';
import {City} from "./cities/cities.model";
import { CommentsModule } from './comments/comments.module';
import {Comment} from "./comments/comments.model";
import { SavedBooksModule } from './saved-books/saved-books.module';
import { SavedBooks } from "./saved-books/saved-books.model";
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { Conversations } from "./conversations/conversations.model";
import { Messages } from "./messages/messages.model";
import { UserConversations } from "./conversations/user-conversations.model";
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from "./post_comments/post-comments.module";
import { PostModel } from "./posts/posts.model";
import { PostComment } from "./post_comments/post-comments.model";
import { SavedPosts } from "./saved-posts/saved-posts.model";
import { SavedPostsModule } from "./saved-posts/saved-posts.module";
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengeCommentsModule } from "./challenge_comments/challenge-comments.module";
import { Challenge } from "./challenges/challenges.model";
import { ChallengeComment } from "./challenge_comments/challenge-comments.model";
import { ChallengesUsersModule } from './challenges-users/challenges-users.module';
import { ChallengesUsers } from "./challenges-users/challenges-users.model";

@Module({
    controllers:[],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Book,
                Genre, GenreBooks, City, Comment,
                PostComment, PostModel, SavedPosts,
                Challenge, ChallengeComment, ChallengesUsers,
                SavedBooks, Conversations, Messages, UserConversations],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        BooksModule,
        FilesModule,
        GenresModule,
        CitiesModule,
        CommentsModule,
        SavedBooksModule,
        ConversationsModule,
        MessagesModule,
        PostsModule,
        PostCommentsModule,
        SavedPostsModule,
        ChallengesModule,
        ChallengeCommentsModule,
        ChallengesUsersModule
    ]
})
export class AppModule {}
