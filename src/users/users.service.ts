import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './entities/users.dto';
import { UserEntity } from './entities/users.entities';
import { UserServiceInterface } from './entities/users.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: CreateUserDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return this.getUser(newUser.id);
  }

  public async updateUser(userId: number, user: UpdateUserDTO): Promise<UserEntity> {
    await this.userRepository.update(userId, user);

    return this.getUser(userId);
  }

  public async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.softDelete(userId);
  }
}
