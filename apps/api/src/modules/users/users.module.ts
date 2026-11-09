import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from '../../database/database.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [DatabaseModule, ImagesModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
