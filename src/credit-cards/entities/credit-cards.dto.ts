import { Type } from "class-transformer";
import { IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreditCardIdDTO {
    @Type(() => Number)
    @IsInt()
    credit_card_id: number;
}

export class CreateCreditCardDTO {
    @Type(() => Number)
    @IsInt()
    user_id: number;

    @IsString()
    name: string;

    @IsDecimal()
    limit: number;

    @Type(() => Number)
    @IsInt()
    closing_day: number;

    @Type(() => Number)
    @IsInt()
    payment_day: number;
}

export class UpdateCreditCardDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    user_id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsDecimal()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    closing_day?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    payment_day?: number;
}

export class CreditCardSearchParams {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    credit_card_id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    user_id?: number;
}