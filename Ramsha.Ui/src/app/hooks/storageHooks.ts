import { useMutation } from "@tanstack/react-query"
import { storageService } from "../api/services/storageService"
import { UploadRangeRequest, UploadRequest, UploadResponse } from "../models/common/commonModels"
import { toast } from "sonner"

export const useUploadFile = () => {
    const { mutateAsync, isPending } = useMutation<UploadResponse, Error, UploadRequest>({
        mutationFn: async (data) => await storageService.uploadFile(data),
        onError: () => toast.error("uploaded failed")
    })

    return {
        upload: mutateAsync,
        isUploadPending: isPending
    }
}

export const useUploadFiles = () => {
    const { mutateAsync, isPending } = useMutation<UploadResponse[], Error, UploadRangeRequest>({
        mutationFn: async (data) => await storageService.uploadRangeFile(data),
        onError: () => toast.error("uploaded failed")

    })

    return {
        upload: mutateAsync,
        isUploadPending: isPending
    }
}