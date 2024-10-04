import { create } from 'zustand'
import { Account } from '../models/account';
import axios from 'axios';
import { setTokenToHeader } from '../api/client';
type AuthStore = {
    setAccount: (account: Account) => void;
    clearAccount: () => void;
    refresh: () => Promise<string | null>;
    account: Account | null
}


export const useAuthStore = create<AuthStore>((set, get) => ({
    account: null,
    setAccount: (account) => {
        set({ account: account })
    },
    clearAccount: () => {
        set({ account: null })
    },
    refresh: async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/account/refresh`,
                {},
                { withCredentials: true }
            );
            const responseAccount = response.data.data as Account;
            const { accessToken } = responseAccount;
            setTokenToHeader(accessToken)
            get().setAccount(responseAccount);
            return accessToken;
        } catch (error) {
            get().clearAccount();
            throw error;
        }
    },
    
}))