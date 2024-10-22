import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// This hook fetches account data from the API using the provided id when the hook is called with an id value
export const useGetAccount = ( id?: string ) => {
    const query = useQuery({
        enabled: !!id, // Only fetch if id is provided, !!id is a shorthand for id !== undefined && id !== null

        queryKey: ["accounts", { id }],
        queryFn: async () => {
            const response = await client.api.accounts[":id"].$get({
                param: { id }, // Pass the id to the API endpoint
            });

            if (!response.ok) {
                throw new Error("Failed to fetch account");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}
