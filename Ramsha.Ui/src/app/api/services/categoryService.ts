import request from "../Request";

const BASE_URL = "categories"

const getCategories =async () =>
  await request({
        url: BASE_URL,
        method: 'GET',
    })


export const categoryService = {
    getCategories
}