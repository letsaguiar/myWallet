import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
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
import { CreditCardEntity } from '../../credit-cards/entities/credit-cards.entity';

@Entity('credit_card_bills')
export class CCBillEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsObject()
  @ManyToOne(() => CreditCardEntity)
  credit_card: CreditCardEntity;

  @IsDateString()
  @Column({ type: 'date' })
  payment_date: Date;

  @IsInt()
  @Column({ type: 'smallint' })
  reference_month: number;

  @IsInt()
  @Column({ type: 'smallint' })
  reference_year: number;

  @IsBoolean()
  @Column({ type: 'boolean' })
  paid: boolean;

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
