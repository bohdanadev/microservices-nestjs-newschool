import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository],
  controllers: [UserCommands, UserQueries],
  exports: [UserRepository],
})
export class UserModule {}
