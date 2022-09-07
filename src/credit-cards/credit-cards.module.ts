import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardEntity } from './entities/credit-cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCardEntity])],
})
export class CreditCardModule {}
