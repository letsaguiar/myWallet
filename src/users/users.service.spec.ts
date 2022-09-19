import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/users.entities";
import { UserService } from "./users.service";
import { getRepositoryMock } from "../../test/utilities/get-repository";

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<UserEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: getRepositoryMock('users/users.json'),
                }
            ],
        }).compile();

        service = module.get(UserService);
        repository = module.get(getRepositoryToken(UserEntity));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

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