


export type Account = {
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
    refreshTokenExpiration: Date;
}

export type loginRequest = {
    username: string;
    password: string;
}