// Hook to get accounts from the API endpoint /api/accounts using the useGetAccounts hook.

import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get(); // This is not axios, it's a generated client from the Hono API.

            if (!response.ok) {
                throw new Error("Failed to fetch accounts");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}

// This implementation way is type safe because it uses the generated client from the Hono API. The useGetAccounts hook uses the useQuery hook from react-query to fetch the accounts from the API endpoint /api/accounts. The hook returns the query object which contains the data, error, and status of the query. The query object can be used to render the UI based on the query status. If the query fails, an error message is thrown with the reason for the failure. This hook can be used in any React component to fetch the accounts data from the API endpoint.
