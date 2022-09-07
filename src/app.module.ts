import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CCBillModule } from './credit-card-bills/credit-card-bills.module';
import { CCTransactionsModule } from './credit-card-transactions/credit-card-transactions.module';
import { CreditCardModule } from './credit-cards/credit-cards.module';
import { TransactionModule } from './transactions/transactions.module';
import { UserModule } from './users/users.module';
import { WalletModule } from './wallets/wallets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    WalletModule,
    TransactionModule,
    CreditCardModule,
    CCBillModule,
    CCTransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
