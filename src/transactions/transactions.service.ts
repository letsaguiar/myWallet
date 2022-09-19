import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { WalletService } from "../wallets/wallets.service";
import { CreateTransactionDTO, UpdateTransactionPartialDTO, TransactionFilterParams, UpdateTransactionFullDTO } from "./entities/transactions.dto";
import { TransactionEntity } from "./entities/transactions.entity";
import { TransactionServiceInterface } from "./entities/transactions.interface";

@Injectable()
export class TransactionService implements TransactionServiceInterface {
  private observers: any[];

  public constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly walletService: WalletService,
  ) {

    this.observers = [];
    this.subscribe(this.walletService);

  }

  private subscribe(observer: any): void {
    this.observers.push(observer);
  }

  private unsubscribe(observer: any): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private async notify(command: string, params: any): Promise<void> {
    this.observers.forEach((observer) => observer[command](params));
  }

  public async createTransaction(transaction: CreateTransactionDTO): Promise<TransactionEntity> {
    const newTransaction = this.transactionRepository.create(transaction);
    newTransaction.wallet = await this.walletService.getWalletByWalletId(transaction.wallet_id);
  
    await Promise.all([
      this.transactionRepository.save(newTransaction),
      this.notify('addTransaction', newTransaction),
    ])


    return this.getTransactionByTransactionId(newTransaction.id);
  }

  public async updateTransaction(transactionId: number, transaction: UpdateTransactionPartialDTO): Promise<TransactionEntity> {
    const fullTransactionDTO = await this.buildUpdateTransactionFullDTO(transactionId, transaction);
    
    const sourceTransaction = await this.getTransactionByTransactionId(transactionId, { relations: ['wallet']} );
    await this.transactionRepository.update(transactionId, fullTransactionDTO);
      
    const targetTransaction = await this.getTransactionByTransactionId(transactionId, { relations: ['wallet']} );
    await this.notify('updateTransaction', { sourceTransaction, targetTransaction });

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

  public async getTransactionByTransactionId(transactionId: number, options?: FindOneOptions<TransactionEntity>): Promise<TransactionEntity> {
    return await this.transactionRepository.findOne({ where: { id: transactionId }, ...options });
  }

  public async getTransactionByWalletId(walletId: number, filters?: TransactionFilterParams): Promise<TransactionEntity[]> {
    const queryFilters = this.buildTransactionQueryFilters(filters);
    queryFilters.where = { wallet: { id: walletId }, ...queryFilters.where };

    return await this.transactionRepository.find(queryFilters);
  }
    
  public async getTransactionByUserId(userId: number, filters?: TransactionFilterParams): Promise<TransactionEntity[]> {
    const queryFilters = this.buildTransactionQueryFilters(filters);
    queryFilters.where = { wallet: { user: { id: userId } }, ...queryFilters.where };

    return await this.transactionRepository.find(queryFilters);
  }

  private buildTransactionQueryFilters(filters: TransactionFilterParams): FindManyOptions<TransactionEntity> {
    const queryFilters: FindManyOptions<TransactionEntity> = {};

    if (!filters) {
      return {};
    }

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
    const deletedTransaction = await this.getTransactionByTransactionId(transactionId, { relations: ['wallet'] });

    await Promise.all([
      this.transactionRepository.softDelete(transactionId),
      this.notify('deleteTransaction', deletedTransaction),
    ]);
  }
    
}