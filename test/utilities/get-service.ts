import { getServiceDependencies } from "./get-dependencies";

export function getServiceMock (serviceName: string) {
    const { main, dependencies } = getServiceDependencies(serviceName);
    
    const service = new main();
    for (const dependency of dependencies) {
        service[dependency.name] = dependency.value;
    }

    return service;
}