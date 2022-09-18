import { CreateWalletDTO, UpdateWalletPartialDTO, WalletIdDTO } from "./wallets.dto";
import { WalletEntity } from "./wallets.entities";

export interface WalletSearchParams {
  wallet_id: number;
  user_id: number;
}

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