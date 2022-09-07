import { Exclude } from 'class-transformer';
import { IsDecimal, IsNumber, IsObject, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/users.entities';

@Entity('wallets')
export class WalletEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsString()
  @Column({ type: 'varchar' })
  description: string;

  @IsDecimal()
  @Column({ type: 'money' })
  initial_amount: number;

  @IsDecimal()
  @Column({ type: 'money' })
  current_balance: number;

  @IsObject()
  @ManyToOne(() => UserEntity)
  user: UserEntity;

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
