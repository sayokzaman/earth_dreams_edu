import { GenericColumnDef } from '@/components/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';

export const universityColumns: GenericColumnDef<University>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (university) => <span className="pl-4">{university.id}</span>,
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        align: 'start',
        render: (university) => (
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src={university.logo} alt={university.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {university.name[0]}
                    </AvatarFallback>
                </Avatar>
                <Link
                    href={route('admin.universities.show', university.id)}
                    className="pl-3 text-blue-200 capitalize underline-offset-2 hover:underline"
                >
                    {university.name}
                </Link>
            </div>
        ),
    },
];
