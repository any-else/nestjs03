import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: any) {
    //c1: thêm vào bằng hàm
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return 'user được thêm mới thành công';
  }

  async findAll() {
    const data = await this.userRepository.find();
    return {
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.userRepository.findOneBy({ user_id: id });
    return {
      data: data,
    };
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
