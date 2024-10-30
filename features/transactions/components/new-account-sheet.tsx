import { 
    Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTitle
 } from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { useCreateAccount } from "../api/use-create-transaction";
import { AccountForm } from "./account-form";
import { FormValue } from "hono/types";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };
    
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to get started.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                    onSubmit={onSubmit} 
                    disabled={mutation.isPending}
                    defaultValues={{ name: '' }}
                />
            </SheetContent>
        </Sheet>
    )
}
