import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallets.entities';

import { WalletService } from './wallets.service';
import { WalletController } from './wallets.controller';

import { UserModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    UserModule
  ],
  exports: [ WalletService ],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
