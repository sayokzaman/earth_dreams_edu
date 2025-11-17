import { TextWithBreaks } from '@/components/text-with-breaks';
import { ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';
import { User } from '@/types';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';

type Props = {
    user: User;
    setDeleteModalData: (user: User) => void;
    setCreateEditModalData: (user: User) => void;
};

const UserActions = ({ user, setDeleteModalData, setCreateEditModalData }: Props) => {
    return (
        <>
            <ContextMenuLabel>
                <div className="flex flex-col gap-1">
                    <TextWithBreaks text={user.name} />
                    <div className="flex gap-1 text-xs text-foreground/75">{/* <MapPinIcon className="size-4" /> {user.location} */}</div>
                </div>
            </ContextMenuLabel>

            <ContextMenuSeparator />

            <ContextMenuItem onClick={() => setCreateEditModalData(user)}>
                <span className="flex gap-2">
                    <SquarePenIcon className="size-5" /> <span>Edit user</span>
                </span>
            </ContextMenuItem>

            <ContextMenuItem
                onClick={() => {
                    setDeleteModalData(user);
                }}
            >
                <span className="flex gap-2 text-destructive">
                    <Trash2Icon className="size-5" /> <span>Delete</span>
                </span>
            </ContextMenuItem>
        </>
    );
};

export default UserActions;
