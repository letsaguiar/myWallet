import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallets.entities';

import { UserService } from '../users/users.service';
import { WalletService } from './wallets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    UserService,
  ],
  providers: [WalletService],
})
export class WalletModule {}
