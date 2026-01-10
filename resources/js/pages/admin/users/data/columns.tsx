import { GenericColumnDef } from '@/components/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/types';
import { format } from 'date-fns';
import { BadgeAlertIcon } from 'lucide-react';

export const userColumns: GenericColumnDef<User>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (user) => <span className="pl-4">{user.id}</span>,
    },

    {
        key: 'name',
        label: 'Username',
        sortable: true,
        align: 'start',
        render: (user) => {
            const getInitials = () => {
                const names = user.name.split(' ');
                const initials = names.map((n) => n.charAt(0).toUpperCase());
                return initials.slice(0, 2).join('');
            };

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        <AvatarImage src={user.avatar ? `/storage/${user.avatar}` : undefined} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="h-full">{user.name}</span>
                </div>
            );
        },
    },

    {
        key: 'email',
        label: 'Email',
        sortable: true,
        align: 'start',
        render: (user) => (
            <span className="flex items-center gap-2 pl-3">
                {user.email}{' '}
                {!user.email_verified_at && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <BadgeAlertIcon className="h-4 w-4 text-yellow-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Not Verified</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </span>
        ),
    },

    {
        key: 'phone',
        label: 'Phone',
        align: 'center',
        render: (user) => <span className="pl-4">{user.phone}</span>,
    },

    {
        key: 'roles',
        label: 'Roles',
        align: 'center',
        render: (user) => (
            <div className="flex flex-wrap items-center justify-center gap-2">
                {user.roles && user.roles.length > 0 ? (
                    user.roles.map((role) => (
                        <Badge
                            key={user.id + role.name}
                            className="rounded-full font-semibold capitalize"
                            variant={
                                role.name === 'super-admin'
                                    ? 'destructive'
                                    : role.name === 'admin'
                                      ? 'default'
                                      : role.name === 'manager'
                                        ? 'manual'
                                        : 'outline'
                            }
                        >
                            {role.name}
                        </Badge>
                    ))
                ) : (
                    <Badge className="rounded-full font-semibold capitalize" variant="pending">
                        Unassigned
                    </Badge>
                )}
            </div>
        ),
    },

    {
        key: 'created_at',
        label: 'Joined',
        sortable: true,
        align: 'start',
        render: (user) => <span className="pl-3">{format(new Date(user.created_at), 'dd MMM, yyyy')}</span>,
    },
];
