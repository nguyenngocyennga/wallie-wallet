import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { cn } from "@/lib/utils";

type Props = {
    account: string,
    accountId: string,
}

export const AccountColumn = ({ 
    account, 
    accountId 
}: Props) => {
    const { onOpen: onOpenAccount } = useOpenAccount();

    const onClick = () => {
        // console.log('Opening account', accountId);
        onOpenAccount(accountId);
    };

    return (
        <div 
            onClick={onClick}
            className="flex items-center cursor-pointer hover:underline"
        >
            {account}
        </div>
    );
};
