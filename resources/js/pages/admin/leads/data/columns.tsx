import { GenericColumnDef } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/lead';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { FaWhatsapp } from 'react-icons/fa';

export const leadColumns: GenericColumnDef<Lead>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <Link href={route('admin.leads.show', lead.id)} className="pl-4 text-blue-300 underline-offset-2 hover:underline">
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
        key: 'study_type',
        label: 'Study Type',
        sortable: false,
        align: 'center',
        render: (lead) => (
            <div className="flex items-center justify-center">
                <Badge
                    variant={
                        lead.study_type === 'undergraduate'
                            ? 'rose'
                            : lead.study_type === 'masters'
                              ? 'orange'
                              : lead.study_type === 'foundation'
                                ? 'violet'
                                : lead.study_type === 'doctorate'
                                  ? 'blue'
                                  : 'green'
                    }
                    className="capitalize"
                >
                    {lead.study_type}
                </Badge>
            </div>
        ),
    },
    {
        key: 'subject_interested',
        label: 'Interested Subject',
        sortable: false,
        align: 'center',
        render: (lead) => <span className="pl-2 capitalize">{lead.subject_interested}</span>,
    },
    {
        key: 'country_of_residence',
        label: 'Country of Residence',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <span className="pl-2 capitalize">
                {lead.country_of_residence}
                {lead.in_uk_now && (
                    <Badge variant="manual" className="ml-2 rounded-full font-semibold">
                        In UK
                    </Badge>
                )}
            </span>
        ),
    },
    {
        key: 'mobile',
        label: 'Mobile',
        align: 'center',
        render: (lead) => (
            <span className="flex items-center justify-center gap-2 pl-4 capitalize">
                {lead.mobile_country_code + ' ' + lead.mobile}
                {lead.is_whatsapp && <FaWhatsapp className="inline text-green-500" />}
            </span>
        ),
    },
    {
        key: 'created_at',
        label: 'Created At',
        sortable: true,
        align: 'center',
        render: (lead) => (
            <div className="grid items-center">
                <span className='font-bold text-base'>{format(new Date(lead.created_at), 'hh:mm a')}</span>
                <span className='text-xs text-muted-foreground'>{format(new Date(lead.created_at), 'MMM dd, yyyy')}</span>
            </div>
        ),
    },
];
