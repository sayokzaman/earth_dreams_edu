import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks';
import { Badge } from '@/components/ui/badge';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { BookOpen, Film, MapPin } from 'lucide-react';

export const universityColumns: GenericColumnDef<University>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (university) => <span className="pl-3 font-semibold text-muted-foreground">#{university.id}</span>,
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        align: 'start',
        render: (university) => (
            <Link href={route('admin.universities.show', university.id)} className="group flex items-center gap-3">
                <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 p-1.5 dark:from-blue-950/30 dark:to-blue-950/50">
                    <img src={`/storage/${university?.logo}`} alt={university.name} className="h-full w-full object-contain" />
                </div>
                <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate font-semibold text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">
                        <TextWithBreaks text={university.name} isLink />
                    </span>
                    <span className="text-xs text-muted-foreground">ID: {university.id}</span>
                </div>
            </Link>
        ),
    },
    {
        key: 'location',
        label: 'Location',
        sortable: true,
        align: 'start',
        render: (university) => (
            <div className="flex items-center gap-2 pl-2.5">
                <span className="rounded-lg bg-foreground/10 p-1.5">
                    <MapPin className="h-4 w-4 text-foreground" />
                </span>
                <span className="font-medium capitalize">{university.location}</span>
            </div>
        ),
    },
    {
        key: 'rankings',
        label: 'Rankings',
        align: 'center',
        render: (university) => (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-1.5 text-xs font-semibold">
                    <Badge className="gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow">
                        QS: {university.qs_ranking || 'N/A'}
                    </Badge>
                    <Badge className="gap-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow">
                        Guardian: {university.guardian_ranking || 'N/A'}
                    </Badge>
                    <Badge className="gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow">
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
            <div className="flex items-center justify-center gap-3">
                <Badge className="rounded-full border border-primary/30 bg-primary/10 font-semibold text-primary">
                    Total: {university.content_count || 0}
                </Badge>
                <div className="flex gap-2 border-l border-border pl-3">
                    <Badge variant="outline" className="gap-1.5 rounded-lg font-semibold">
                        <BookOpen className="h-3 w-3" /> {university.text_section_count || 0}
                    </Badge>
                    <Badge variant="outline" className="gap-1.5 rounded-lg font-semibold">
                        <Film className="h-3 w-3" /> {university.video_section_count || 0}
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
            <div className="flex flex-col items-center justify-center gap-0.5">
                <span className="text-sm font-semibold">{format(new Date(university.created_at), 'dd MMM yyyy')}</span>
                <span className="text-xs text-muted-foreground">{format(new Date(university.created_at), 'h:mm a')}</span>
            </div>
        ),
    },
];
