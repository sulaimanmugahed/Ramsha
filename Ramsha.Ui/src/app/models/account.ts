import { Basket } from "./basket";



export type Account = {
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
    refreshTokenExpiration: Date;
    basket?: Basket
}

export type loginRequest = {
    username: string;
    password: string;
}