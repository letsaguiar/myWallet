import { OmitType, PartialType } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNotEmpty, IsObject, IsString } from "class-validator";
import { UserEntity } from "../../users/entities/users.entities";

export class WalletIdDTO {
  @IsInt()
  wallet_id: number;
}

export class CreateWalletDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  initial_amount: number;

  @IsInt()
  user_id: number;
}

export class UpdateWalletPartialDTO extends PartialType(CreateWalletDTO) {};

export class UpdateWalletFullDTO extends OmitType(UpdateWalletPartialDTO, ['user_id'] as const) {
  @IsDecimal()
  current_balance?: number;

  @IsObject()
  user?: UserEntity;
}