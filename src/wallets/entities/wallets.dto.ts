import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WalletIdDTO {
  @IsNumber()
  wallet_id: number;
}

export class CreateWalletDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  initial_amount: number;

  @IsNumber()
  user_id: number;
}

export class UpdateWalletDTO extends PartialType(
    OmitType(CreateWalletDTO, ['user_id'] as const)
) {}