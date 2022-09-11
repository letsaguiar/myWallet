import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "./entities/users.entities";

import { UserService } from "./users.service";

import { UserRepositoryMock } from "../../mocks/users/user-repository-mock";

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepositoryMock;
    
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            UserService,
            {
              provide: getRepositoryToken(UserEntity),
              useClass: UserRepositoryMock,
            },
        ],
        }).compile();
    
        service = module.get<UserService>(UserService);
        repository = module.get<UserRepositoryMock>(getRepositoryToken(UserEntity));
    
        jest.spyOn(repository, 'create');
        jest.spyOn(repository, 'save');
        jest.spyOn(repository, 'update');
        jest.spyOn(repository, 'findOneBy');
        jest.spyOn(repository, 'softDelete');
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {
        it('should call create and save methods', async () => {
            await service.createUser({
                first_name: 'Tom',
                last_name: 'Burch',
                email: 'tom.burch@test.com',
                password: '123456',
            });

            expect(repository.create).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        it('should call update method', async () => {
            await service.updateUser(1, {
                password: '1234567',
            })

            expect(repository.update).toHaveBeenCalled();
        });
    });

    describe('getUser', () => {
        it('should call findOneBy method', async () => {
            await service.getUser(1);

            expect(repository.findOneBy).toHaveBeenCalled();
        });
    })

    describe('deleteUser', () => {
        it('should call softDelete method', async () => {
            await service.deleteUser(1);

            expect(repository.softDelete).toHaveBeenCalled();
        });
    });
})