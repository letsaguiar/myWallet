import { getRepositoryMock } from "./repository";

class ServiceMockConstructor {
    public main: any;
    private dependencies: any;

    constructor(main) {
        this.main = new main();
        this.dependencies = [];
    }

    public buildDependencies() {
        const properties = Object.getOwnPropertyNames(this.main);

        for(const property of properties) {
            this.dependencies.push({
                name: property,
                type: this.getDependencyType(property),
                value: this.getDependencyValue(property),
            });
        }
    }

    private getDependencyType(name: string) {
        if (name.includes('Repository')) {
            return 'repository';
        }
        else if (name.includes('Service')) {
            return 'service';
        }
    }

    private getDependencyValue(name: string) {
        const cleanName = name
            .replace('Repository', '')
            .replace('Service', '');

        return cleanName + '.json';
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

export function getServiceMock (service) {
    const serviceMock = new ServiceMockConstructor(service);
    serviceMock.buildDependencies();
    serviceMock.loadDependencies();
    serviceMock.assignDependencies();

    return serviceMock.main;
}