import { GenericColumnDef } from '@/components/table/data-table';
import { Lead } from '@/types/lead';

export const leadColumns: GenericColumnDef<Lead>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (lead) => <span className="pl-4">{lead.id}</span>,
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
