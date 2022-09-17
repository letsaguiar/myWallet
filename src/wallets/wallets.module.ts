import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../users/users.service';
import { WalletEntity } from './entities/wallets.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    UserService,
  ],
})
export class WalletModule {}
