"use client";

import { useOpenCategory } from "@/features/categories/hooks/use-open-categories";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

// Props type for the Actions component
type Props = {
    id: string;
}

// Actions component that renders a dropdown menu with an Edit option that opens the category modal dialog box
export const Actions = ({ id }: Props) => {
    const [ ConfirmDialog, confirm ] = useConfirm(
        "Are you sure?",
        "You are about to delete this category. This action cannot be undone.",
    );
    const deleteMutation = useDeleteCategory(id);

    // useOpenCategory hook to manage the state of the open category modal dialog box in the application
    const { onOpen } = useOpenCategory();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    }

    // Render the dropdown menu with an Edit option that opens the category modal dialog box when clicked with the provided id
    return (
        <>
            <ConfirmDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild> 
                    <Button variant="ghost" className="size-8 p=0">
                        <MoreHorizontal className="size-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="size-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
