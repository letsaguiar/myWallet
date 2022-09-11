import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO, UserIdDTO } from './entities/users.dto';
import { UserEntity } from './entities/users.entities';
import { UserControllerInterface } from './entities/users.interface';

import { UserService } from './users.service';

@Controller('user')
export class UserController implements UserControllerInterface {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  public async createUser(@Body() body: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Patch(':user_id')
  public async updateUser(@Param() params: UserIdDTO, @Body() body: UpdateUserDTO): Promise<UserEntity> {
    return this.userService.updateUser(params.user_id, body);
  }

  @Get(':user_id')
  public async getUser(@Param() params: UserIdDTO): Promise<UserEntity> {
    return this.userService.getUser(params.user_id);
  }

  @Delete(':user_id')
  public async deleteUser(@Param() params: UserIdDTO): Promise<void> {
    return this.userService.deleteUser(params.user_id);
  }
}
