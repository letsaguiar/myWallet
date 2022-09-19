import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from '../wallets/wallets.module';
import { TransactionEntity } from './entities/transactions.entity';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    WalletModule,
  ],
  exports: [ TransactionService ],
  providers: [ TransactionService ],
  controllers: [ TransactionController ],
})
export class TransactionModule {}
