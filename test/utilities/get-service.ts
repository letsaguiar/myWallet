
export function getServiceMock(service, dependencies) {
    const serviceMock = new service();

    Object.keys(dependencies).forEach((dependency) => {
        serviceMock[dependency] = dependencies[dependency];
    });
    
    return serviceMock;
}