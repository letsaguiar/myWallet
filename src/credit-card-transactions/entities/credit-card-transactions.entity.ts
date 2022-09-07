import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CCBillEntity } from '../../credit-card-bills/entities/credit-card-bills.entity';
import { TransactionTypes } from '../../transactions/entities/transactions.enum';

@Entity('credit_card_transactions')
export class CCTransactionsEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsObject()
  @ManyToOne(() => CCBillEntity)
  bill: CCBillEntity;

  @IsEnum(TransactionTypes)
  @Column({ type: 'varchar' })
  type: TransactionTypes;

  @IsDecimal()
  @Column({ type: 'money' })
  amount: number;

  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  @Exclude()
  @CreateDateColumn({ select: false })
  created_at?: Date;

  @Exclude()
  @UpdateDateColumn({ select: false })
  updated_at?: Date;

  @Exclude()
  @DeleteDateColumn({ select: false })
  deleted_at?: Date;
}
