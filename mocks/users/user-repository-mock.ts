import { BaseRepositoryMock } from "../utilities/base-repository-mock";

export class UserRepositoryMock extends BaseRepositoryMock {
  public constructor() {
    super('users/users.json');
  }
}