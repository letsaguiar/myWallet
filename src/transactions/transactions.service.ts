import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { WalletService } from "../wallets/wallets.service";
import { CreateTransactionDTO, UpdateTransactionPartialDTO, TransactionFilterParams, UpdateTransactionFullDTO } from "./entities/transactions.dto";
import { TransactionEntity } from "./entities/transactions.entity";
import { TransactionServiceInterface } from "./entities/transactions.interface";

@Injectable()
export class TransactionService implements TransactionServiceInterface {
  public constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly walletService: WalletService,
  ) {}

  public async createTransaction(transaction: CreateTransactionDTO): Promise<TransactionEntity> {
    const newTransaction = this.transactionRepository.create(transaction);
    newTransaction.wallet = await this.walletService.getWalletByWalletId(transaction.wallet_id);
  
    await this.transactionRepository.save(newTransaction);

    return this.getTransactionByTransactionId(newTransaction.id);
  }

  public async updateTransaction(transactionId: number, transaction: UpdateTransactionPartialDTO): Promise<TransactionEntity> {
    const fullTransaction = await this.buildUpdateTransactionFullDTO(transactionId, transaction);
    
    await this.transactionRepository.update(transactionId, fullTransaction);

    return this.getTransactionByTransactionId(transactionId);
  }

  private async buildUpdateTransactionFullDTO(transactionId: number, partialDTO: UpdateTransactionPartialDTO): Promise<UpdateTransactionFullDTO> {
    const { wallet_id, ...rest} = partialDTO;
    const fullDTO: UpdateTransactionFullDTO = rest;

    if (partialDTO.wallet_id) {
      fullDTO.wallet = await this.walletService.getWalletByWalletId(partialDTO.wallet_id);
    }

    return fullDTO;
  }

  public async getTransactionByTransactionId(transactionId: number): Promise<TransactionEntity> {
    return await this.transactionRepository.findOneBy({ id: transactionId });
  }

  public async getTransactionByWalletId(walletId: number, filters: TransactionFilterParams): Promise<TransactionEntity[]> {
    const queryFilters = this.buildTransactionQueryFilters(filters);
    queryFilters.where = { wallet: { id: walletId }, ...queryFilters.where };

    return await this.transactionRepository.find(queryFilters);
  }
    
  public async getTransactionByUserId(userId: number, filters: TransactionFilterParams): Promise<TransactionEntity[]> {
    const queryFilters = this.buildTransactionQueryFilters(filters);
    queryFilters.where = { wallet: { user: { id: userId } }, ...queryFilters.where };

    return await this.transactionRepository.find(queryFilters);
  }

  private buildTransactionQueryFilters(filters: TransactionFilterParams): FindManyOptions<TransactionEntity> {
    const queryFilters: FindManyOptions<TransactionEntity> = {};

    if (filters.type) {
        queryFilters.where = {
            type: filters.type,
            ...queryFilters.where,
        };
    }

    if (filters.start_date) {
      queryFilters.where = {
        date: MoreThanOrEqual(filters.start_date),
        ...queryFilters.where,
      };
    }

    if (filters.end_date) {
      queryFilters.where = {
        date: LessThanOrEqual(filters.end_date),
        ...queryFilters.where,
      };
    }

    return queryFilters;
  }

  public async deleteTransaction(transactionId: number): Promise<void> {
    await this.transactionRepository.softDelete(transactionId);
  }
    
}