import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks'
import { Badge } from '@/components/ui/badge';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { MapPinIcon } from 'lucide-react';

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
                    <TextWithBreaks text={university.name} isLink />
                </Link>
            </div>
        ),
    },
    {
        key: 'location',
        label: 'Location',
        sortable: true,
        align: 'start',
        render: (university) => (
            <div className="flex items-center pl-2.5 capitalize">
                <MapPinIcon className='size-4 mr-1' /> {university.location}
            </div>
        ),
    },
    {
        key: 'rankings',
        label: 'Rankings',
        sortable: true,
        align: 'start',
        render: (university) => (
            <div className="flex items-center pl-2.5 capitalize">
                <div className="flex flex-col items-center justify-center space-y-1 text-xs">
                    <Badge variant={'green'}>QS: {university.qs_ranking || 'N/A'}</Badge>
                    <Badge variant={'rose'} className="border-b">
                        Guardian: {university.guardian_ranking || 'N/A'}
                    </Badge>
                    <Badge variant={'blue'} className="border-b">
                        THE: {university.world_ranking || 'N/A'}
                    </Badge>
                </div>
            </div>
        ),
    },
    {
        key: 'contents',
        label: 'Sections',
        sortable: true,
        align: 'center',
        render: (university) => (
            <div className="flex items-center justify-center gap-1">
                <Badge className="rounded-full font-semibold">Total: {university.content_count || 0}</Badge>
                <div className="flex flex-col gap-1 border-l pl-1">
                    <Badge variant={'outline'} className="rounded-full font-semibold">
                        Text: {university.text_section_count || 0}
                    </Badge>
                    <Badge variant={'outline'} className="rounded-full font-semibold">
                        Video: {university.video_section_count || 0}
                    </Badge>
                </div>
            </div>
        ),
    },
    {
        key: 'created_at',
        label: 'Created At',
        sortable: true,
        align: 'center',
        render: (university) => (
            <div className="flex flex-col items-center justify-center capitalize">
                <p>{format(new Date(university.created_at), 'h:mm a')}</p>
                <p>{format(new Date(university.created_at), 'dd-MM-yyyy')}</p>
            </div>
        ),
    },
];
