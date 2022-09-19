import { TransactionService } from "../../src/transactions/transactions.service";
import { UserService } from "../../src/users/users.service";
import { WalletService } from "../../src/wallets/wallets.service";

export const serviceDependencies = {
    UserService: {
        main: UserService,
        dependencies: [
            {
                name: 'userRepository',
                type: 'repository',
                value: 'users/users.json',
            }
        ]
    },
    WalletService: {
        main: WalletService,
        dependencies: [
            {
                name: 'walletRepository',
                type: 'repository',
                value: 'wallets/wallets.json',
            },
            {
                name: 'userService',
                type: 'service',
                value: 'UserService',
            }
        ]
    },
    TransactionService: {
        main: TransactionService,
        dependencies: [
            {
                name: 'transactionRepository',
                type: 'repository',
                value: 'transactions/transactions.json',
            },
            {
                name: 'walletService',
                type: 'service',
                value: 'WalletService',
            }
        ]
    }
}