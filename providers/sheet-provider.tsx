"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useMountedState } from "react-use";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet/>
            <EditAccountSheet/>
        </>
    );
};

// This component is used to render the NewAccountSheet and EditAccountSheet components when the SheetProvider is mounted