// Hook to get transactions from the API endpoint /api/transactions using the useGetTransactions hook.

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransactions = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        // TODO: Check if params are needed in the queryKey
        queryKey: ["transactions", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const { data } = await response.json();
            return data.map((transaction) => ({
                ...transaction,
                amount: convertAmountFromMiliunits(transaction.amount),
            }))
        },
    });

    return query;
}

// This implementation way is type safe because it uses the generated client from the Hono API. The useGetTransactions hook uses the useQuery hook from react-query to fetch the transactions from the API endpoint /api/transactions. The hook returns the query object which contains the data, error, and status of the query. The query object can be used to render the UI based on the query status. If the query fails, an error message is thrown with the reason for the failure. This hook can be used in any React component to fetch the transactions data from the API endpoint.
