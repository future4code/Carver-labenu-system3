export class DefaultDate {
    constructor(date: string) {
        const dateArray = new Date(date.split("/").reverse().join());
        return dateArray;
    }
}