import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO, UserIdDTO } from './entities/users.dto';
import { UserEntity } from './entities/users.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: CreateUserDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return this.findUserById({ user_id: newUser.id });
  }

  public async updateUser(
    params: UserIdDTO,
    user: UpdateUserDTO,
  ): Promise<UserEntity> {
    await this.userRepository.update(params.user_id, user);

    return this.findUserById({ user_id: params.user_id });
  }

  public async findUserById(params: UserIdDTO): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: params.user_id });
  }

  public async deleteUser(params: UserIdDTO): Promise<void> {
    await this.userRepository.softDelete(params.user_id);
  }
}
