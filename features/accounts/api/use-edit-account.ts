import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>; 
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

// This hook is used to edit an account by sending a PATCH request to the API with the provided id and JSON data 
export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({ 
                param: { id },
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Account updated');
            queryClient.invalidateQueries({ queryKey: ['account', { id }] }); // refetch the edited account
            queryClient.invalidateQueries({ queryKey: ['accounts'] }); // refetch all accounts
            // TODO: invalidate summary and transactions
        },
        onError: () => {
            toast.error('Failed to edit account');
        }
    });
    
    return mutation;
};
