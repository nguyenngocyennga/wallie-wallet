import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>; 
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

// This hook is used to edit an category by sending a PATCH request to the API with the provided id and JSON data 
export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({ 
                param: { id },
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Category updated');
            queryClient.invalidateQueries({ queryKey: ['category', { id }] }); // refetch the edited category
            queryClient.invalidateQueries({ queryKey: ['categories'] }); // refetch all categories
            // TODO: invalidate summary and transactions
        },
        onError: () => {
            toast.error('Failed to edit category');
        }
    });
    
    return mutation;
};
