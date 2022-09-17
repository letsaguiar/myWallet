import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallets.entities';

import { UserService } from '../users/users.service';
import { WalletService } from './wallets.service';

import { WalletController } from './wallets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    UserService,
  ],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
