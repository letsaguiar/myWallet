import { UserService } from "../../src/users/users.service";
import { WalletService } from "../../src/wallets/wallets.service";
import { getRepositoryMock } from "./get-repository";
import { getServiceMock } from "./get-service";

const serviceDependencies = {
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
            },
        ]
    },
};

export function getServiceDependencies (serviceName: string) {
    const { main, dependencies } = serviceDependencies[serviceName];

    for (const dependency of dependencies) {

        switch (dependency.type) {
            case 'repository':
                dependency.value = getRepositoryMock(dependency.value);
                break;
            case 'service':
                dependency.value = getServiceMock(dependency.value);
                break;
        }
        
    }

    return { main, dependencies };
}