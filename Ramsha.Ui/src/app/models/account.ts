import { AddressInfo } from "../components/maps/mapUtils";



export type Account = {
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
    refreshTokenExpiration: Date;
    address: Address | null
}

export type loginRequest = {
    username: string;
    password: string;
}


export type Address = {
    fullName: string;
    description: string
} & AddressInfo