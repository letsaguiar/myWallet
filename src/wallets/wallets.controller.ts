import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

import { CreateWalletDTO, WalletIdDTO, UpdateWalletPartialDTO } from "./entities/wallets.dto";
import { WalletEntity } from "./entities/wallets.entities";
import { WalletControllerInterface, WalletSearchParams } from "./entities/wallets.interface";

import { WalletService } from "./wallets.service";

@Controller('wallet')
export class WalletController implements WalletControllerInterface {
  public constructor(
    private readonly walletService: WalletService,
  ) {}  

  @Post()
  public async createWallet(@Body() body: CreateWalletDTO): Promise<WalletEntity> {
    return this.walletService.createWallet(body);
  }

  @Patch(':wallet_id')
  public async updateWallet(@Param() params: WalletIdDTO, @Body() body: UpdateWalletPartialDTO): Promise<WalletEntity> {
    return this.walletService.updateWallet(params.wallet_id, body);
  }

  @Get()
  public async getWallet(@Query() query: WalletSearchParams): Promise<WalletEntity | WalletEntity[]> {
    if (query.wallet_id) {
      return this.walletService.getWalletByWalletId(query.wallet_id);
    }
    else if (query.user_id) {
      return this.walletService.getWalletByUserId(query.user_id);
    }
    else {
      throw new Error('Invalid query parameters');
    }
  }

  @Delete(':wallet_id')
  public async deleteWallet(@Param() params: WalletIdDTO): Promise<void> {
    return this.walletService.deleteWallet(params.wallet_id);
  }
}