import { CreateCreditCardDTO, CreditCardIdDTO, CreditCardSearchParams, UpdateCreditCardDTO } from "./credit-cards.dto";
import { CreditCardEntity } from "./credit-cards.entity";

export interface CreditCardControllerInterface {
    createCreditCard(body: CreateCreditCardDTO): Promise<CreditCardEntity>;
    updateCreditCard(params: CreditCardIdDTO, body: UpdateCreditCardDTO): Promise<CreditCardEntity>;
    getCreditCard(query: CreditCardSearchParams): Promise<CreditCardEntity | CreditCardEntity[]>;
    deleteCreditCard(params: CreditCardIdDTO): Promise<void>;
}

export interface CreditCardServiceInterface {
    createCreditCard(creditCard: CreateCreditCardDTO): Promise<CreditCardEntity>;
    updateCreditCard(creditCardId: number, creditCard: UpdateCreditCardDTO): Promise<CreditCardEntity>;
    getCreditCardByCreditCardId(creditCardId: number): Promise<CreditCardEntity>;
    getCreditCardByUserId(userId: number): Promise<CreditCardEntity[]>;
    deleteCreditCard(creditCardId: number): Promise<void>;
}