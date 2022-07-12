import {CarbonDataSource, UserDataSource} from '../datasources';
import {Carbon} from '../interfaces';
import {NotFoundError} from '../errors';

export class CarbonService {
    private readonly carbonDataSource: CarbonDataSource;
    private readonly userDataSource: UserDataSource;

    constructor(carbonDataSource: CarbonDataSource, userDataSource: UserDataSource) {
        this.carbonDataSource = carbonDataSource;
        this.userDataSource = userDataSource;
    }

    getAvailableCarbons(): Carbon[]  {
        return this.carbonDataSource.getByStatus('available');
    }

    getCarbonsById(id: string): Carbon[] {
        const user = this.userDataSource.getUser(id);
        if (!user) throw new NotFoundError(`User with id ${id} does not exist`);

        return this.carbonDataSource.getByOwner(id);
    }
}
