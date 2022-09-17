import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateWalletDTO, UpdateWalletFullDTO, UpdateWalletPartialDTO, } from "./entities/wallets.dto";
import { WalletEntity } from "./entities/wallets.entities";
import { WalletServiceInterface } from "./entities/wallets.interface";

import { UserService } from "../users/users.service";

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
    const fullDTO: UpdateWalletFullDTO = partialDTO;
    
    if (partialDTO.initial_amount) {
        const wallet = await this.getWalletByWalletId(walletId);
        const balanceDifference = wallet.initial_amount - partialDTO.initial_amount;

        fullDTO.current_balance = wallet.current_balance + balanceDifference;
    }

    if (partialDTO.user_id) {
        fullDTO.user = await this.userService.getUser(partialDTO.user_id);
    }

    return fullDTO;
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
}