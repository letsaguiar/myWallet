import { TransactionEntity } from "./transactions.entity";
import { CreateTransactionDTO, TransactionFilterParams, TransactionIdDTO, TransactionSearchParams, UpdateTransactionPartialDTO } from "./transactions.dto";

export interface TransactionControllerInterface {
  createTransaction(body: CreateTransactionDTO): Promise<TransactionEntity>;
  updateTransaction(params: TransactionIdDTO, body: UpdateTransactionPartialDTO): Promise<TransactionEntity>;
  getTransaction(query: TransactionSearchParams, body: TransactionFilterParams): Promise<TransactionEntity | TransactionEntity[]>;
  deleteTransaction(params: TransactionIdDTO): Promise<void>;
}

export interface TransactionServiceInterface {
  createTransaction(transaction: CreateTransactionDTO): Promise<TransactionEntity>;
  updateTransaction(transactionId: number, transaction: UpdateTransactionPartialDTO): Promise<TransactionEntity>;
  getTransactionByTransactionId(transactionId: number): Promise<TransactionEntity>;
  getTransactionByWalletId(walletId: number, filters: TransactionFilterParams): Promise<TransactionEntity[]>;
  getTransactionByUserId(userId: number, filters: TransactionFilterParams): Promise<TransactionEntity[]>;
  deleteTransaction(transactionId: number): Promise<void>;
}