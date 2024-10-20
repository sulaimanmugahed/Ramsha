import { Mutation, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner"
import { extractErrorMessages } from "../utils/util";
import AppError from "../utils/appError";


export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (_error, query) => {
            if (query.meta?.errorMessage) {
                toast.error(query.meta.errorMessage as string)
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (
            error: unknown,
            _variables: unknown,
            _context: unknown,
            mutation: Mutation<unknown, unknown, unknown, unknown>
        ): void => {
            if (error instanceof AppError && mutation.meta?.ERROR_SOURCE) {
                const errorMessage = extractErrorMessages(error.errors);
                
                toast.error(`${mutation.meta.ERROR_SOURCE}:\n${errorMessage}`);
            } else if (error instanceof Error && mutation.meta?.ERROR_SOURCE) {
                toast.error(`${mutation.meta.ERROR_SOURCE}: ${error.message}`);
            }
        },
        onSuccess: (
            _data: unknown,
            _variables: unknown,
            _context: unknown,
            mutation: Mutation<unknown, unknown, unknown, unknown>
        ): void => {
            if (mutation.meta?.SUCCESS_MESSAGE) {
                toast.success(`${mutation.meta.SUCCESS_MESSAGE}:`);
            }
        }
    })
})

type AppQueryProviderProps = {
    children: React.ReactNode
}


export const AppQueryProvider = ({ children }: AppQueryProviderProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}