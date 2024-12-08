import request from "../Request"


const BASE_URL = 'deliveryAgents'

const getAll = async () => {
    return await request<any>({
        url: `${BASE_URL}`
    })
}

const create = async (data: any) => {
    return await request({
        url: `${BASE_URL}`,
        method: 'POST',
        data
    })
}

export const deliveryAgentService = {
    getAll,
    create
}