export function generateId(arr: any[]): number {
    const lastId = arr[arr.length - 1].id;
    return lastId + 1;
}