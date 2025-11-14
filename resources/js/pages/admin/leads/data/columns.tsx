import { GenericColumnDef } from '@/components/table/data-table';
import { Lead } from '@/types/lead';
import { Link } from '@inertiajs/react';

export const leadColumns: GenericColumnDef<Lead>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <Link href={route('admin.leads.show', lead.id)} className="pl-4 text-blue-300 hover:underline underline-offset-2">
                Lead #{lead.id}
            </Link>
        ),
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        align: 'start',
        render: (lead) => <span className="pl-2 capitalize">{lead.first_name + ' ' + lead.last_name}</span>,
    },
    {
        key: 'email',
        label: 'Email',
        sortable: true,
        align: 'start',
        render: (lead) => <span className="pl-2">{lead.email}</span>,
    },
    {
        key: 'country_of_residence',
        label: 'Country of Residence',
        sortable: true,
        align: 'start',
        render: (lead) => <span className="pl-2 capitalize">{lead.country_of_residence}</span>,
    },
    {
        key: 'mobile',
        label: 'Mobile',
        align: 'center',
        render: (lead) => <span className="pl-4 capitalize">{lead.mobile_country_code + ' ' + lead.mobile}</span>,
    },
];
