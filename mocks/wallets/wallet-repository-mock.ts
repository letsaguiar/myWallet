import { BaseRepositoryMock } from "../utilities/base-repository-mock";

export class WalletRepositoryMock extends BaseRepositoryMock {
  public constructor() {
    super('wallets/wallets.json');
  }

  public findBy(criteria) {
    const userId = criteria.user.id;
    const entries = this.data.filter(item => item.userId === userId);

    return entries;
  }
}