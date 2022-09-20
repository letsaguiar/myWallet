import { OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsDecimal, IsEnum, IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { WalletEntity } from "../../wallets/entities/wallets.entities";
import { TransactionTypes } from "./transactions.enum";

export class TransactionIdDTO {
  @Type(() => Number)
  @IsInt()
  transaction_id: number;
}

export class CreateTransactionDTO {
  @IsString()
  description: string;

  @IsEnum(TransactionTypes)
  type: TransactionTypes;

  @IsDecimal()
  amount: number;

  @Type(() => Date)
  @IsDateString()
  date: Date;

  @Type(() => Number)
  @IsInt()
  wallet_id: number;
}

export class UpdateTransactionPartialDTO {
  @IsOptional()
  @IsString()
  description: string;
  
  @IsOptional()
  @IsEnum(TransactionTypes)
  type: TransactionTypes;
  
  @IsOptional()
  @IsDecimal()
  amount: number;
  
  @IsOptional()
  @Type(() => Date)
  @IsDateString()
    date: Date;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  wallet_id: number;
}

export class UpdateTransactionFullDTO extends OmitType(UpdateTransactionPartialDTO, ['wallet_id'] as const) {
  @IsOptional()
  @IsObject()
  wallet?: WalletEntity;
}

export class TransactionSearchParams {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  transaction_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  wallet_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;
}

export class TransactionFilterParams {
  @IsOptional()
  @IsEnum(TransactionTypes)
  type?: TransactionTypes;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  end_date: Date;
}