
import { Address } from "../../models/account"
import request from "../Request"

const BASE_URL = "account"

const verifyEmail = async (email: string, token: string) => {
    return await request({
        url: `account/verify-email?email=${email}&token=${token}`,
    })
}
const sendConfirmEmail = async (email: string) => {
    return await request({
        url: `account/send-confirm-email?email=${email}`,
        method: 'POST'
    })
}

const logout = async () =>
    await request({
        url: `${BASE_URL}/logout`,
        method: 'POST',
        data: {}
    })

const login = async (data: any) =>
    await request({
        url: `${BASE_URL}/login`,
        method: 'POST',
        data
    })


const updateAddress = async (data: Address) =>
    await request({
        url: `${BASE_URL}/address`,
        method: 'PUT',
        data
    })

const register = async (data: any) => {
    const { who, ...userData } = data;
    return await request({
        url: `${data.who}`,
        method: 'POST',
        data: userData
    })
}


const refresh = async () =>
    request({
        url: `${BASE_URL}/refresh`,
        method: 'POST',
        data: {}
    })
    ;



export const accountService = {
    login,
    refresh,
    logout,
    register,
    updateAddress,
    sendConfirmEmail,
    verifyEmail
}

