import { OmitType } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { UserEntity } from "../../users/entities/users.entities";
import { Type } from "class-transformer";

export class WalletIdDTO {
  @Type(() => Number)
  @IsInt()
  wallet_id: number;
}

export class CreateWalletDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsDecimal()
  initial_amount: number;

  @Type(() => Number)
  @IsInt()
  user_id: number;
}

export class UpdateWalletPartialDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDecimal()
  initial_amount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;
};

export class UpdateWalletFullDTO extends OmitType(UpdateWalletPartialDTO, ['user_id'] as const) {
  @IsOptional()
  @IsDecimal()
  current_balance?: number;

  @IsOptional()
  @IsObject()
  user?: UserEntity;
}

export class WalletSearchParams {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  wallet_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;
}