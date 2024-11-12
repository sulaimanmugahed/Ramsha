import { AddressInfo } from "../components/maps/mapUtils";
import { CurrencyCode } from "./common/currency";



export type Account = {
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
    refreshTokenExpiration: Date;
    address: Address | null
    preferredCurrency: CurrencyCode
}

export type loginRequest = {
    username: string;
    password: string;
}


export type Address = {
    fullName: string;
    description: string
} & AddressInfo