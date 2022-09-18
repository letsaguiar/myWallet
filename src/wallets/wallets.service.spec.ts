import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserServiceMock } from "../../mocks/users/user-service-mock";
import { WalletRepositoryMock } from "../../mocks/wallets/wallet-repository-mock";
import { UserService } from "../users/users.service";
import { WalletEntity } from "./entities/wallets.entities";
import { WalletService } from "./wallets.service"

describe('WalletService', () => {
    let service: WalletService;
    let repository: WalletRepositoryMock;
    let userService: UserService;
    
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            WalletService,
            {
              provide: getRepositoryToken(WalletEntity),
              useClass: WalletRepositoryMock,
            },
            {
              provide: UserService,
              useClass: UserServiceMock,
            },
        ],
        }).compile();
    
        service = module.get<WalletService>(WalletService);
        repository = module.get<WalletRepositoryMock>(getRepositoryToken(WalletEntity));
        userService = module.get<UserService>(UserService);
    
        jest.spyOn(repository, 'create');
        jest.spyOn(repository, 'save');
        jest.spyOn(repository, 'update');
        jest.spyOn(repository, 'findOneBy');
        jest.spyOn(repository, 'findBy');
        jest.spyOn(repository, 'softDelete');
        jest.spyOn(userService, 'getUser');
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createWallet', () => {
        it('should call create, save and getUser methods', async () => {
            await service.createWallet({
                name: 'Wallet 3',
                description: null,
                initial_amount: 100,
                user_id: 1,
            });

            expect(repository.create).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalled();
            expect(userService.getUser).toHaveBeenCalled();
        });

        it('should assign current_balance equal to initial_amount', async () => {
            const newWallet = await service.createWallet({
                name: 'Wallet 3',
                description: null,
                initial_amount: 100,
                user_id: 1,
            });

            expect(newWallet.current_balance).toEqual(100);
        });

        it('should assign userId equal to user_id', async () => {
            const newWallet = await service.createWallet({
                name: 'Wallet 3',
                description: null,
                initial_amount: 100,
                user_id: 1,
            });

            expect(newWallet.user.id).toEqual(1);
        });
    });

    describe('updateWallet', () => {
        it('should call update method', async () => {
            await service.updateWallet(1, {
                description: 'Wallet 1 description',
            });

            expect(repository.update).toHaveBeenCalled();
        });

        it('should update current_balance properly', async () => {
            const updatedWallet = await service.updateWallet(1, {
                initial_amount: 200,
            });

            expect(updatedWallet.current_balance).toEqual(200);
        });

        it('should update userId properly', async () => {
            const updatedWallet = await service.updateWallet(1, {
                user_id: 2,
            });

            expect(updatedWallet.user.id).toEqual(2);
        })
    });

    describe('getWalletByWalletId', () => {
        it('should call findOneBy method', async () => {
            await service.getWalletByWalletId(1);

            expect(repository.findOneBy).toHaveBeenCalled();
        });
    });

    describe('getWalletByUserId', () => {
        it('should call findBy method', async () => {
            await service.getWalletByUserId(1);

            expect(repository.findBy).toHaveBeenCalled();
        });
    });

    describe('deleteWallet', () => {
        it('should call softDelete method', async () => {
            await service.deleteWallet(1);

            expect(repository.softDelete).toHaveBeenCalled();
        });
    });
});