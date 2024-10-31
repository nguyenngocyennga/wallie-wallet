import { z } from "zod";
import { Loader2 } from "lucide-react";
import { AccountForm } from "./transaction-form";
import { insertAccountSchema } from "@/db/schema";
import { useOpenAccount } from "../hooks/use-open-accounts";
import { useGetAccount } from "../api/use-get-transaction";
import { useEditAccount } from "../api/use-edit-transaction";
import { useDeleteAccount } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { 
    Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTitle
 } from "@/components/ui/sheet";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ ConfirmDialog, confirm ] = useConfirm(
        "Are you sure?",
        "You are about to delete this account. This action cannot be undone.",
    );

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    // If the accountQuery is successful, set the defaultValues to the account name, otherwise set the defaultValues to an empty string
    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    }: {
        name: ""
    };
    
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>
                            Edit an existing account
                        </SheetDescription>
                    </SheetHeader>
                    {/* If the accountQuery is loading, display a loading spinner, otherwise display the AccountForm component */}
                    { isLoading
                        ? (
                            <div className="aboslute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />

                            </div>
                        ) : (
                            <AccountForm
                                id={id}
                                onSubmit={onSubmit} 
                                disabled={isPending}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />
                        )}
                </SheetContent>
            </Sheet>
        </>
    )
}
