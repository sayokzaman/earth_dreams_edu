import { GenericColumnDef } from '@/components/table/data-table';
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
        label: 'Name',
        sortable: true,
        align: 'start',
        render: (user) => <span className="pl-3">{user.name}</span>,
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
                            variant={role.name === 'admin' ? 'destructive' : role.name === 'manager' ? 'manual' : 'default'}
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
