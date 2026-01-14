import { GenericColumnDef } from '@/components/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/types';
import { format } from 'date-fns';
import { BadgeAlertIcon, Mail, Phone } from 'lucide-react';

export const userColumns: GenericColumnDef<User>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (user) => <span className="pl-3 font-semibold text-muted-foreground">#{user.id}</span>,
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
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-rose-100 dark:ring-rose-900/60">
                        <AvatarImage src={user.avatar ? `/storage/${user.avatar}` : undefined} alt={user.name} />
                        <AvatarFallback className="rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-100">
                            {getInitials()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-foreground">{user.name}</span>
                        <span className="text-xs text-muted-foreground">ID: {user.id}</span>
                    </div>
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
            <span className="flex items-center gap-2 pl-2">
                <Mail className="h-4 w-4 text-rose-600" />
                <span>{user.email}</span>
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
        render: (user) => (
            <span className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-rose-600" />
                {user.phone || '—'}
            </span>
        ),
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
                            className="rounded-full px-3 py-1 font-semibold capitalize"
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
                    <Badge className="rounded-full px-3 py-1 font-semibold capitalize" variant="pending">
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
        align: 'center',
        render: (user) => (
            <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-semibold">{format(new Date(user.created_at), 'dd MMM yyyy')}</span>
                <span className="text-xs text-muted-foreground">{format(new Date(user.created_at), 'h:mm a')}</span>
            </div>
        ),
    },
];
