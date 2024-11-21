import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

// This hook fetches transaction data from the API using the provided id when the hook is called with an id value
export const useGetTransaction = ( id?: string ) => {
    const query = useQuery({
        enabled: !!id, // Only fetch if id is provided, !!id is a shorthand for id !== undefined && id !== null

        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({
                param: { id }, // Pass the id to the API endpoint
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromMiliunits(data.amount),
            };
        },
    });

    return query;
}
