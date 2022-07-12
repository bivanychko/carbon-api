import {User} from '../interaces';

export class UserDataSource {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    getUser(id: string): User | null {
        const user = this.users.find(user => user.id === id);

        return user ?? null;
    }

    addUser(user: User): void {
        this.users.push(user);
    }
}
