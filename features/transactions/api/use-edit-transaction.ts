import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>; 
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

// This hook is used to edit an transaction by sending a PATCH request to the API with the provided id and JSON data 
export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.transactions[":id"]["$patch"]({ 
                param: { id },
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Transaction updated');
            queryClient.invalidateQueries({ queryKey: ['transaction', { id }] }); // refetch the edited transaction
            queryClient.invalidateQueries({ queryKey: ['transactions'] }); // refetch all transactions
            // TODO: invalidate summary
        },
        onError: () => {
            toast.error('Failed to edit transaction');
        }
    });
    
    return mutation;
};
