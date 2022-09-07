import {
  IsDecimal,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/users.entities';

@Entity('credit_cards')
export class CreditCardEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsObject()
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsDecimal()
  @Column({ type: 'money' })
  limit: number;

  @IsInt()
  @Column({ type: 'smallint' })
  closing_day: number;

  @IsInt()
  @Column({ type: 'smallint' })
  payment_day: number;
}
