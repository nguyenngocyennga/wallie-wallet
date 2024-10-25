// Hook to get categories from the API endpoint /api/categories using the useGetCategories hook.

import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await client.api.categories.$get(); // This is not axios, it's a generated client from the Hono API.

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}

// This implementation way is type safe because it uses the generated client from the Hono API. The useGetCategories hook uses the useQuery hook from react-query to fetch the categories from the API endpoint /api/categories. The hook returns the query object which contains the data, error, and status of the query. The query object can be used to render the UI based on the query status. If the query fails, an error message is thrown with the reason for the failure. This hook can be used in any React component to fetch the categories data from the API endpoint.
