import { GenericColumnDef } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/lead';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Mail, Phone, User as UserIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const leadColumns: GenericColumnDef<Lead>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <Link
                href={route('admin.leads.show', lead.id)}
                className="pl-3 font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-300"
            >
                Lead #{lead.id}
            </Link>
        ),
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <div className="flex items-center gap-2 pl-2">
                <UserIcon className="h-4 w-4 text-orange-600" />
                <span className="font-medium capitalize">{lead.first_name + ' ' + lead.last_name}</span>
            </div>
        ),
    },
    {
        key: 'email',
        label: 'Email',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <div className="flex items-center gap-2 pl-2">
                <Mail className="h-4 w-4 text-orange-600" />
                <span className="truncate">{lead.email}</span>
            </div>
        ),
    },
    {
        key: 'study_type',
        label: 'Study Type',
        sortable: false,
        align: 'center',
        render: (lead) => (
            <Badge
                className="rounded-full px-3 py-1 font-semibold capitalize shadow"
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
            >
                {lead.study_type}
            </Badge>
        ),
    },
    {
        key: 'subject_interested',
        label: 'Interested Subject',
        sortable: false,
        align: 'center',
        render: (lead) => <span className="font-medium capitalize">{lead.subject_interested}</span>,
    },
    {
        key: 'country_of_residence',
        label: 'Country of Residence',
        sortable: true,
        align: 'start',
        render: (lead) => (
            <>
                <span className="font-medium capitalize">{lead.country_of_residence}</span>
                {lead.in_uk_now && (
                    <Badge variant="manual" className="ml-1 rounded-full font-semibold">
                        In UK
                    </Badge>
                )}
            </>
        ),
    },
    {
        key: 'mobile',
        label: 'Mobile',
        align: 'center',
        render: (lead) => (
            <span className="flex items-center justify-center gap-2 pl-2">
                <Phone className="h-4 w-4 text-orange-600" />
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
            <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-semibold">{format(new Date(lead.created_at), 'dd MMM yyyy')}</span>
                <span className="text-xs text-muted-foreground">{format(new Date(lead.created_at), 'h:mm a')}</span>
            </div>
        ),
    },
];
