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
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Patch(':user_id')
  public async update(
    @Param() params: UserIdDTO,
    @Body() body: UpdateUserDTO,
  ): Promise<UserEntity> {
    return this.userService.updateUser(params, body);
  }

  @Get(':user_id')
  public async findOne(@Param() params: UserIdDTO): Promise<UserEntity> {
    return this.userService.findUserById(params);
  }

  @Delete(':user_id')
  public async delete(@Param() params: UserIdDTO): Promise<void> {
    return this.userService.deleteUser(params);
  }
}
