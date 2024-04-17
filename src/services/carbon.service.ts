import { carbonStatuses } from "../common";
import { CarbonDataSource, UserDataSource } from "../datasources";
import { BadRequestError, NotFoundError } from "../errors";
import { Carbon } from "../interfaces";

export class CarbonService {
  private readonly carbonDataSource: CarbonDataSource;
  private readonly userDataSource: UserDataSource;

  constructor(carbonDataSource: CarbonDataSource, userDataSource: UserDataSource) {
    this.carbonDataSource = carbonDataSource;
    this.userDataSource = userDataSource;
  }

  getAvailableCarbons(): Carbon[] {
    return this.carbonDataSource.getByStatus(carbonStatuses.available);
  }

  getCarbonsById(id: string): Carbon[] {
    const user = this.userDataSource.getUser(id);
    if (!user) throw new NotFoundError(`User with id ${id} does not exist`);

    return this.carbonDataSource.getByOwner(id);
  }

  transferMyCarbons(fromUserId: string, toUserId: string): void {
    const user = this.userDataSource.getUser(toUserId);
    if (!user) throw new NotFoundError(`User you want to transfer carbons does not exist`);

    const myCarbons = this.carbonDataSource.getByOwner(fromUserId);
    if (!myCarbons.length) throw new BadRequestError("You do not have any carbons to transfer");

    this.carbonDataSource.transferCarbons(myCarbons, toUserId);
  }
}
