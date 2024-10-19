import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccount = ( id?: string ) => {
    const query = useQuery({
        enabled: !!id, // Only fetch if id is provided, !!id is a shorthand for id !== undefined && id !== null

        queryKey: ["accounts", { id }],
        queryFn: async () => {
            const response = await client.api.accounts[":id"].$get({
                param: { id },
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
