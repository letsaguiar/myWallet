import { CreateUserDTO, UpdateUserDTO, UserIdDTO } from './users.dto';
import { UserEntity } from './users.entities';

export interface UserControllerInterface {
  createUser(body: CreateUserDTO): Promise<UserEntity>;
  updateUser(params: UserIdDTO, body: UpdateUserDTO): Promise<UserEntity>;
  getUser(params: UserIdDTO): Promise<UserEntity>;
  deleteUser(params: UserIdDTO): Promise<void>;
}

export interface UserServiceInterface {
  createUser(user: CreateUserDTO): Promise<UserEntity>;
  updateUser(userId: number, user: UpdateUserDTO): Promise<UserEntity>;
  getUser(userId: number): Promise<UserEntity>;
  deleteUser(userId: number): Promise<void>;
}
