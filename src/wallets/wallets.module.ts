import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallets.entities';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
})
export class WalletModule {}
