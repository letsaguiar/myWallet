import { serviceDependencies } from "./config";
import { getRepositoryMock } from "./repository";

class ServiceMockConstructor {
    public main: any;
    private dependencies: any;

    constructor(serviceName: string) {
        const { main, dependencies } = serviceDependencies[serviceName];

        this.main = new main();
        this.dependencies = dependencies;
    }

    public loadDependencies() {
        for (const dependency of this.dependencies) {

            switch (dependency.type) {
                case 'repository':
                    dependency.value = getRepositoryMock(dependency.value);
                    break;
                case 'service':
                    dependency.value = getServiceMock(dependency.value);
                    break;
            }

        }
    }

    public assignDependencies() {
        for (const dependency of this.dependencies) {
            this.main[dependency.name] = dependency.value;
        }
    }
}

export function getServiceMock (service: string) {
    const serviceMock = new ServiceMockConstructor(service);
    serviceMock.loadDependencies();
    serviceMock.assignDependencies();

    return serviceMock.main;
}