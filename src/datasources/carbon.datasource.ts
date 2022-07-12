import {Carbon} from '../interfaces';

export class CarbonDataSource {
    private carbons: Carbon[];

    constructor(carbons: Carbon[]) {
        this.carbons = carbons;
    }

    getByStatus(status: string): Carbon[] {
        return this.carbons.filter(carbon => carbon.status === status);
    }

    getByOwner(id: string): Carbon[] {
        return this.carbons.filter(carbon => carbon.owner === id);
    }
}
