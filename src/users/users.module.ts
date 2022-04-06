import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Book} from "../books/books.model";
import {FilesModule} from "../files/files.module";
import {CitiesModule} from "../cities/cities.module";
import { SavedBooksModule } from "../saved-books/saved-books.module";
import { SavedBooks } from "../saved-books/saved-books.model";
import { Conversations } from "../conversations/conversations.model";
import { Messages } from "../messages/messages.model";
import { UserConversations } from "../conversations/user-conversations.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Book, SavedBooks, Conversations, Messages, UserConversations]),
      RolesModule,
      forwardRef(() => AuthModule),
      FilesModule,
      CitiesModule
  ],
    exports:[UsersService]
})
export class UsersModule {}
