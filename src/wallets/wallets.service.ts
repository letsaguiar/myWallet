import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateWalletDTO, UpdateWalletFullDTO, UpdateWalletPartialDTO, } from "./entities/wallets.dto";
import { WalletEntity } from "./entities/wallets.entities";
import { WalletServiceInterface, WalletUpdateBalanceInterface, WalletUpdateTransactionInterface } from "./entities/wallets.interface";

import { UserService } from "../users/users.service";

import * as Dinero from 'dinero.js';
import { TransactionEntity } from "../transactions/entities/transactions.entity";
import { TransactionTypes } from "../transactions/entities/transactions.enum";

@Injectable()
export class WalletService implements WalletServiceInterface {
  public constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly userService: UserService,
  ) {}

  public async createWallet(wallet: CreateWalletDTO): Promise<WalletEntity> {
    const newWallet = this.walletRepository.create(wallet);
    newWallet.user = await this.userService.getUser(wallet.user_id);
    newWallet.current_balance = wallet.initial_amount;

    await this.walletRepository.save(newWallet);

    return this.getWalletByWalletId(newWallet.id);
  }
    
  public async updateWallet(walletId: number, wallet: UpdateWalletPartialDTO): Promise<WalletEntity> {
    const fullWallet = await this.buildUpdateWalletFullDTO(walletId, wallet);
    
    await this.walletRepository.update(walletId, fullWallet);

    return this.getWalletByWalletId(walletId);
  }

  private async buildUpdateWalletFullDTO(walletId: number, partialDTO: UpdateWalletPartialDTO): Promise<UpdateWalletFullDTO> {
    const { user_id, ...rest} = partialDTO;
    const fullDTO: UpdateWalletFullDTO = rest;
    
    if (partialDTO.initial_amount) {
        const wallet = await this.getWalletByWalletId(walletId);
        
        const sourceAmount = Dinero({ amount: Number(wallet.initial_amount) });
        const targetAmount = Dinero({ amount: Number(partialDTO.initial_amount) });
        const amountDifference = targetAmount.subtract(sourceAmount);

        const sourceBalance = Dinero({ amount: Number(wallet.current_balance) });
        const targetBalance = sourceBalance.add(amountDifference);

        fullDTO.current_balance = targetBalance.toUnit() * 100;
    }

    if (partialDTO.user_id) {
        fullDTO.user = await this.userService.getUser(partialDTO.user_id);
    }

    return fullDTO;
  }

  private async updateCurrentBalance(params: WalletUpdateBalanceInterface): Promise<void> {
    const { wallet_id, amount, type } = params;

    const wallet = await this.getWalletByWalletId(wallet_id);

    const sourceAmount = Dinero({ amount: Number(amount) });
    const sourceBalance = Dinero({ amount: Number(wallet.current_balance) });

    const targetBalance = type === TransactionTypes.INCOME ?
      sourceBalance.add(sourceAmount) : sourceBalance.subtract(sourceAmount);

    await this.walletRepository.update(wallet_id, { current_balance: targetBalance.toUnit() * 100 });
  }
    
  public async getWalletByWalletId(walletId: number): Promise<WalletEntity> {
    return await this.walletRepository.findOneBy({ id: walletId });
  }
    
  public async getWalletByUserId(userId: number): Promise<WalletEntity[]> {
    return await this.walletRepository.findBy({ user: { id: userId } });
  }
    
  public async deleteWallet(walletId: number): Promise<void> {
    await this.walletRepository.softDelete(walletId);
  }

  public async addTransaction(transaction: TransactionEntity): Promise<void> {
    await this.updateCurrentBalance({
      wallet_id: transaction.wallet.id,
      amount: transaction.amount,
      type: transaction.type,
    });
  }

  public async deleteTransaction(transaction: TransactionEntity): Promise<void> {
    const type = transaction.type === TransactionTypes.INCOME ?
      TransactionTypes.EXPENSE : TransactionTypes.INCOME;
    
    await this.updateCurrentBalance({
      wallet_id: transaction.wallet.id,
      amount: transaction.amount,
      type: type,
    });
  }

  public async updateTransaction(params: WalletUpdateTransactionInterface): Promise<void> {
    const { sourceTransaction, targetTransaction } = params;

    await Promise.all([
      this.deleteTransaction(sourceTransaction),
      this.addTransaction(targetTransaction),
    ]);
  }
}