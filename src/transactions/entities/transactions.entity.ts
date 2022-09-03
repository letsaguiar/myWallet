import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from '../../wallets/entities/wallets.entities';
import { TransactionTypes } from './transactions.enum';

@Entity('transactions')
export class TransactionEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEnum(TransactionTypes)
  @Column({ type: 'varchar' })
  type: TransactionTypes;

  @IsDecimal()
  @Column({ type: 'money' })
  amount: number;

  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  @IsObject()
  @ManyToOne(() => WalletEntity)
  wallet: WalletEntity;
}
