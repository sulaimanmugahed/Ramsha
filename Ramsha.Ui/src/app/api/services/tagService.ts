import { Tag } from "../../models/tags/tag";
import request from "../Request";

const BASE_URL = "tags"


const getTags = async () => {
    return await request<Tag[]>({
        url: `${BASE_URL}`
    })
}

const getTag = async (id: string) => {
    return await request<Tag>({
        url: `${BASE_URL}/${id}`,
    })
}

const createTag = async (data: { name: string }) => {
    return await request({
        url: BASE_URL,
        method: 'POST',
        data
    })
}

const updateTag = async (id: string, data: { name: string }) => {
    return await request({
        url: `${BASE_URL}/${id}`,
        method: 'PUT',
        data
    })
}

const deleteTag = async (id: string) => {
    return await request({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
    })
}


export const tagService = {
    getTag,
    getTags,
    createTag,
    updateTag,
    deleteTag
}