import { UploadRequest, UploadResponse,UploadRangeRequest } from "../../models/common/commonModels";
import { createFormData } from "../../utils/util";
import request from "../Request";

const uploadFile = async (data: UploadRequest): Promise<UploadResponse> => {
    const formData = createFormData(data);

    const BASE_URL = "storage"
    return await request({
        url: `${BASE_URL}/upload`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
    })
}

const uploadRangeFile = async (data: UploadRangeRequest): Promise<UploadResponse[]> => {
    const formData = createFormData(data);

    const BASE_URL = "storage"
    return await request({
        url: `${BASE_URL}/uploadRange`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
    })
}


export const storageService = {
    uploadFile,
    uploadRangeFile
}