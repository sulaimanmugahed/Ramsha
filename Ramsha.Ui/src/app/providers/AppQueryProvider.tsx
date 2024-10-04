import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"


const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (_error, query) => {
            if (query.meta?.errorMessage) {
                toast.error(query.meta.errorMessage as string)
            }
        },
    }),
})

type AppQueryProviderProps = {
    children: React.ReactNode
}


export const AppQueryProvider = ({ children }: AppQueryProviderProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}