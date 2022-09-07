import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CCTransactionsEntity } from './entities/credit-card-transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CCTransactionsEntity])],
})
export class CCTransactionsModule {}
