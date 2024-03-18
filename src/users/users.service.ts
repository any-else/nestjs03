import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: any) {
    //c1: thêm vào bằng hàm
    // const user = this.userRepository.create(createUserDto);
    // await this.userRepository.save(user);

    //c2: nó tiệm cận so với ae đã học ở MD3
    await this.userRepository
      .createQueryBuilder('users')
      .insert()
      .into(UserEntity)
      .values(createUserDto)
      .execute();

    return 'user được thêm mới thành công';
  }

  async findAll() {
    // const data = await this.userRepository.find();
    const data = await this.userRepository
      .createQueryBuilder('users')
      .getMany();
    return {
      data: data,
    };
  }

  async findOne(id: number) {
    // const data = await this.userRepository.findOneBy({ user_id: id });
    const data = await this.userRepository
      .createQueryBuilder('users')
      .where('users.user_id = :id', {
        id: id,
      })
      .execute();
    return {
      data: data,
    };
  }

  async update(id: number, updateUserDto: any) {
    /** đi tìm  user với id đã tồn tại trong database */
    const data = await this.findOne(id);
    if (!data)
      throw new HttpException('user khong ton tai', HttpStatus.BAD_REQUEST);

    // const user = await this.userRepository.update(
    //   {
    //     user_id: id,
    //   },
    //   { ...updateUserDto },
    // );
    const user = await this.userRepository
      .createQueryBuilder('users')
      .update(UserEntity)
      .set({
        ...updateUserDto,
      })
      .where('users.user_id = :id', { id: id })
      .execute();

    return `This action updates a #${user} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete({ user_id: id });
    return `This action removes a #${id} user`;
  }

  async search(queryString) {
    console.log('queryString: ', queryString);
    const data = await this.userRepository.findBy({
      user_name: ILike(`%${queryString}%`),
    });

    return {
      data: data,
    };
  }
}
