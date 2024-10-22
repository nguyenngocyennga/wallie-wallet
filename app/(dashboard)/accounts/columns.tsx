"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Actions } from "./actions";

// This type is used to define the shape of the data returned by the API: an array of objects with id and name properties
export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0];

// This array defines the columns for the table
export const columns: ColumnDef<ResponseType>[] = [
  // The first column is a checkbox that allows the user to select all rows on the current page
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // The second column is the name of the account
  {
    accessorKey: "name",
    // header: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // The third column is the actions column, which contains the Actions component
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  }
];
