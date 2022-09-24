import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
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
import { WalletEntity } from '../../wallets/entities/wallets.entities';
import { TransactionTypes } from './transactions.enum';

@Entity('transactions')
export class TransactionEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'text' })
  description: string;

  @IsEnum(TransactionTypes)
  @Column({ type: 'varchar' })
  type: TransactionTypes;

  @IsDecimal()
  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  @IsObject()
  @ManyToOne(() => WalletEntity)
  wallet: WalletEntity;

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
