import request from "../Request"

const BASE_URL = "account"

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
    register
}

