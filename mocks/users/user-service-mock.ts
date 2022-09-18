import { UserRepositoryMock } from "./user-repository-mock";

export class UserServiceMock {
    repository: UserRepositoryMock;

    public constructor() {
        this.repository = new UserRepositoryMock();
    }

    public getUser(userId: number) {
        return this.repository.findOneBy({ id: userId });
    }
}