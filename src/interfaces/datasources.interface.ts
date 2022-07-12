type CarbonStatus = 'available' | 'owned' | 'transferred';

export interface Carbon {
    id: string;
    country: string;
    status: CarbonStatus;
    owner: string | null;
}

export interface User {
    id: string;
}
