import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
@Entity({ name: 'users' }) // định nghĩa ra tên bảng
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  user_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  role: ROLE;
}
