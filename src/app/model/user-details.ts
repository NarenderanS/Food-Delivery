import { Address } from "./address";

export interface UserDetails {
    id: number;
    username: string;
    name: string;
    roles: string;
    addressList: Address[];
}
