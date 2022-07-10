export function sortByTimestamp(a: any, b: any, propertyName: string) {
    return b[propertyName] - a[propertyName];
}