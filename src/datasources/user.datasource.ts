import {User} from '../interfaces';

export class UserDataSource {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    getUser(id: string): User | null {
        const user = this.users.find(user => user.id === id);

        return user ?? null;
    }

    getUserIds(): string[] {
        return this.users.map(user => user.id);
    }
}
