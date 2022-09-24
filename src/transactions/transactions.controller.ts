import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateTransactionDTO, TransactionIdDTO, UpdateTransactionPartialDTO, TransactionSearchParams, TransactionFilterParams } from "./entities/transactions.dto";
import { TransactionEntity } from "./entities/transactions.entity";
import { TransactionControllerInterface } from "./entities/transactions.interface";
import { TransactionService } from "./transactions.service";

@Controller('transaction')
export class TransactionController implements TransactionControllerInterface {
  public constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @Post()
  public async createTransaction(@Body() body: CreateTransactionDTO): Promise<TransactionEntity> {
    return await this.transactionService.createTransaction(body);
  }

  @Patch(':transaction_id')
  public async updateTransaction(@Param() params: TransactionIdDTO, @Body() body: UpdateTransactionPartialDTO): Promise<TransactionEntity> {
    return await this.transactionService.updateTransaction(params.transaction_id, body);
  }

  @Get()
  public async getTransaction(@Query() query: TransactionSearchParams, @Body() body: TransactionFilterParams): Promise<TransactionEntity | TransactionEntity[]> {
    if (query.transaction_id) {
      return await this.transactionService.getTransactionByTransactionId(query.transaction_id);
    }
    else if (query.wallet_id) {
      return await this.transactionService.getTransactionByWalletId(query.wallet_id, body);
    }
    else if (query.user_id) {
      return await this.transactionService.getTransactionByUserId(query.user_id, body);
    }
    else {
      throw new Error('Invalid query parameters');
    }
  }

  @Delete(':transaction_id')
  public async deleteTransaction(@Param() params: TransactionIdDTO): Promise<void> {
    await this.transactionService.deleteTransaction(params.transaction_id);
  }
}