import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CCBillEntity } from './entities/credit-card-bills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CCBillEntity])],
})
export class CCBillModule {}
