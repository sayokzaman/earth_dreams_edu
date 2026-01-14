import { TextWithBreaks } from '@/components/text-with-breaks';
import { ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';
import { useRoles } from '@/hooks/use-roles';
import { SharedData, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { MailIcon, PhoneIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';

type Props = {
    user: User;
    setDeleteModalData: (user: User) => void;
    setCreateEditModalData: (user: User) => void;
};

const UserActions = ({ user, setDeleteModalData, setCreateEditModalData }: Props) => {
    const { isSuperAdmin, isAdmin, isElevated } = useRoles();
    const userIsSuperAdmin = user.roles?.some((role) => role.name === 'super-admin');

    const { auth } = usePage<SharedData>().props;

    if (!isElevated) {
        return null;
    }

    return (
        <>
            <ContextMenuLabel>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 font-medium">
                        <TextWithBreaks text={user.name} />
                        {user.id === auth.user?.id ? <span className="text-xs text-muted-foreground">(You)</span> : null}
                    </div>

                    <div className="flex gap-1 text-xs text-foreground/75">
                        <MailIcon className="size-4" /> {user.email}
                    </div>
                    <div className="flex gap-1 text-xs text-foreground/75">
                        <PhoneIcon className="size-4" /> {user.phone}
                    </div>
                </div>
            </ContextMenuLabel>

            {user.id !== auth.user?.id && (isSuperAdmin || (isAdmin && !userIsSuperAdmin)) ? (
                <>
                    <ContextMenuSeparator />

                    <ContextMenuItem onClick={() => setCreateEditModalData(user)} disabled={isAdmin && userIsSuperAdmin}>
                        <span className="flex gap-2">
                            <SquarePenIcon className="size-5" /> <span>Edit user</span>
                        </span>
                    </ContextMenuItem>

                    <ContextMenuItem
                        onClick={() => {
                            setDeleteModalData(user);
                        }}
                    >
                        <span className="flex gap-2 font-semibold text-destructive">
                            <Trash2Icon className="size-5" /> <span>Delete</span>
                        </span>
                    </ContextMenuItem>
                </>
            ) : null}
        </>
    );
};

export default UserActions;
