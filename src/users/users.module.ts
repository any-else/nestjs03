import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // cung cấp repository để tương tác với database
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
