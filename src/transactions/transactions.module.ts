import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
})
export class TransactionModule {}
