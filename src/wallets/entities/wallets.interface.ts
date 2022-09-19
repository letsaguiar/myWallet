import { TransactionEntity } from "../../transactions/entities/transactions.entity";
import { TransactionTypes } from "../../transactions/entities/transactions.enum";
import { CreateWalletDTO, UpdateWalletPartialDTO, WalletIdDTO, WalletSearchParams } from "./wallets.dto";
import { WalletEntity } from "./wallets.entities";

export interface WalletControllerInterface {
  createWallet(body: CreateWalletDTO): Promise<WalletEntity>;
  updateWallet(params: WalletIdDTO, body: UpdateWalletPartialDTO): Promise<WalletEntity>;
  getWallet(query: WalletSearchParams): Promise<WalletEntity | WalletEntity[]>;
  deleteWallet(params: WalletIdDTO): Promise<void>;
}

export interface WalletServiceInterface {
  createWallet(wallet: CreateWalletDTO): Promise<WalletEntity>;
  updateWallet(walletId: number, wallet: UpdateWalletPartialDTO): Promise<WalletEntity>;
  getWalletByWalletId(walletId: number): Promise<WalletEntity>;
  getWalletByUserId(userId: number): Promise<WalletEntity[]>;
  deleteWallet(walletId: number): Promise<void>;
}

export interface WalletUpdateBalanceInterface {
  wallet_id: number;
  amount: number;
  type: TransactionTypes;
}

export interface WalletUpdateTransactionInterface {
  sourceTransaction: TransactionEntity;
  targetTransaction: TransactionEntity;
}