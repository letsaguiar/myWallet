import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getRepositoryMock } from "../../test/utilities/get-repository";
import { getServiceMock } from "../../test/utilities/get-service";
import { WalletService } from "../wallets/wallets.service";
import { TransactionEntity } from "./entities/transactions.entity";
import { TransactionTypes } from "./entities/transactions.enum";
import { TransactionService } from "./transactions.service";

describe('TransactionService', () => {
    let service: TransactionService;
    let walletService: WalletService;
    let repository: Repository<TransactionEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            TransactionService,
            {
              provide: getRepositoryToken(TransactionEntity),
              useValue: getRepositoryMock('transactions/transactions.json'),
            },
            {
                provide: WalletService,
                useValue: getServiceMock('WalletService'),
            }
        ],
        }).compile();

        service = module.get(TransactionService);
        walletService = module.get(WalletService);
        repository = module.get(getRepositoryToken(TransactionEntity));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createTransaction', () => {
        it('should call create and save methods', async () => {
            jest.spyOn(walletService, 'getWalletByWalletId');

            await service.createTransaction({
                type: TransactionTypes.INCOME,
                amount: 100,
                date: new Date(),
                wallet_id: 1,
            });

            expect(repository.create).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalled();
        });

        it('should notify wallets to update their balances', async () => {
            jest.spyOn(walletService, 'addTransaction');

            await service.createTransaction({
                type: TransactionTypes.INCOME,
                amount: 100,
                date: new Date(),
                wallet_id: 1,
            });

            expect(walletService.addTransaction).toHaveBeenCalled();
        });
    });

    describe('updateTransaction', () => {
        it('should call update method', async () => {
            await service.updateTransaction(1, { amount: 200 });

            expect(repository.update).toHaveBeenCalled();
        });

        it('should notify wallets to update their balances', async () => {
            jest.spyOn(walletService, 'updateTransaction');

            await service.updateTransaction(1, { amount: 200 });

            expect(walletService.updateTransaction).toHaveBeenCalled();
        });

        it('should update walletId properly', async () => {
            const updatedTransaction = await service.updateTransaction(1, { wallet_id: 2 });

            expect(updatedTransaction.wallet.id).toBe(2);
        });
    });

    describe('getTransactionByTransactionId', () => {
        it('should call findOne method', async () => {
            await service.getTransactionByTransactionId(1);

            expect(repository.findOne).toHaveBeenCalled();
        });
    });

    describe('getTransactionByWalletId', () => {
        it('should call findOne method', async () => {
            await service.getTransactionByWalletId(1);

            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('getTransactionByUserId', () => {
        it('should call findOne method', async () => {
            await service.getTransactionByUserId(1);

            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('deleteTransaction', () => {
        it('should call softDelete method', async () => {
            await service.deleteTransaction(1);

            expect(repository.softDelete).toHaveBeenCalled();
        });

        it('should notify wallets to update their balances', async () => {
            jest.spyOn(walletService, 'deleteTransaction');

            await service.deleteTransaction(1);

            expect(walletService.deleteTransaction).toHaveBeenCalled();
        });
    });
})