"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { PlusIcon } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52x",
        amount: 50,
        status: "success",
        email: "a@example.com",
    },
    {
        id: "728cd52x",
        amount: 80,
        status: "processing",
        email: "d@example.com",
    },
];

const AccountsPage = () => {
    const newAccount = useNewAccount();

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts page
                    </CardTitle>
                    <Button size='sm' onClick={newAccount.onOpen}>
                        <PlusIcon className="size-4"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        columns={columns} 
                        data={data} 
                        filterKey="email"
                        onDelete={() => {}}
                        disabled={false} // Prevent multiple delete while data is being deleted
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountsPage;