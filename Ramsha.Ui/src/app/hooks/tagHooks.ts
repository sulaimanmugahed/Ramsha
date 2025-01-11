import { useQuery } from "@tanstack/react-query"
import { tagService } from "../api/services/tagService"
import { TAGS_QUERY_KEY } from "../constants/queriesKey"
import { Tag } from "../models/tags/tag"

export const useTags = () => {
    const { data, isLoading, isError } = useQuery<Tag[]>({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: async () => await tagService.getTags(),
    })

    return {
        tags: data,
        isTagsLoading: isLoading,
        isTagsError: isError
    }
}