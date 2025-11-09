import { GenericColumnDef } from '@/components/table/data-table';
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
                <div className="flex h-12 w-20 items-center justify-center rounded-md bg-gray-100 p-1">
                    <img src={university.logo} alt="" className="h-full w-full object-contain" />
                </div>
                <Link
                    href={route('admin.universities.show', university.id)}
                    className="pl-3 text-blue-200 capitalize underline-offset-2 hover:underline"
                >
                    {university.name}
                </Link>
            </div>
        ),
    },
    {
        key: 'location',
        label: 'Location',
        sortable: true,
        align: 'start',
        render: (university) => <div className="flex items-center pl-2.5 capitalize">{university.location}</div>,
    },
    {
        key: 'created_at',
        label: 'Created At',
        sortable: true,
        align: 'center',
        render: (university) => (
            <div className="flex flex-col items-center justify-center capitalize">
                <p>{university.created_at.split('T')[1].split('.')[0]}</p>
                <p>{university.created_at.split('T')[0].split('-').reverse().join('-')}</p>
            </div>
        ),
    },
];
