import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar' })
  first_name: string;

  @IsString()
  @Column({ type: 'varchar' })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @Exclude()
  @CreateDateColumn({ select: false })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
