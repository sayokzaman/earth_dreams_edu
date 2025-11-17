import { GenericColumnDef } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { format } from 'date-fns';

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
        render: (user) => <span className="pl-4">{user.name}</span>,
    },

    {
        key: 'email',
        label: 'Email',
        sortable: true,
        align: 'start',
        render: (user) => <span className="pl-4">{user.email}</span>,
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
        render: (user) => <span className="pl-4">{format(new Date(user.created_at), 'do MMMM, yyyy')}</span>,
    },
];
