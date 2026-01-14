import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarClockIcon, CompassIcon, FileText, PenToolIcon, User as UserIcon } from 'lucide-react';

export const blogColumns: GenericColumnDef<Blog>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (blog) => <span className="pl-3 font-semibold text-muted-foreground">#{blog.id}</span>,
    },

    {
        key: 'title',
        label: 'Title',
        sortable: true,
        align: 'start',
        render: (blog) => (
            <Link href={route('admin.blogs.show', blog.id)} className="group flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
                    <FileText className="h-5 w-5" />
                </span>
                <span className="truncate font-semibold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                    <TextWithBreaks text={blog.title} isLink />
                </span>
            </Link>
        ),
    },

    {
        key: 'author',
        label: 'Author',
        sortable: true,
        align: 'start',
        render: (blog) => (
            <div className="flex items-center gap-2 pl-2.5">
                <UserIcon className="h-4 w-4 text-emerald-600" />
                <span className="font-medium capitalize">{blog.author.name}</span>
            </div>
        ),
    },

    {
        key: 'type',
        label: 'Type',
        sortable: true,
        align: 'center',
        render: (blog) => (
            <Badge
                className="rounded-full py-1 font-semibold capitalize shadow"
                variant={blog.type === 'blog' ? 'manual' : blog.type === 'event' ? 'active' : 'pending'}
            >
                {blog.type === 'blog' ? (
                    <div className="flex items-center gap-1">
                        <PenToolIcon className="inline h-4 w-4" />
                        Blog
                    </div>
                ) : blog.type === 'event' ? (
                    <div className="flex items-center gap-1">
                        <CalendarClockIcon className="inline h-4 w-4" />
                        Event
                    </div>
                ) : (
                    <div className="flex items-center gap-1">
                        <CompassIcon className="inline h-4 w-4" />
                        News
                    </div>
                )}
            </Badge>
        ),
    },

    {
        key: 'date',
        label: 'Published',
        sortable: true,
        align: 'center',
        render: (blog) => (
            <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-semibold">{format(new Date(blog.date), 'dd MMM yyyy')}</span>
                <span className="text-xs text-muted-foreground">{format(new Date(blog.date), 'h:mm a')}</span>
            </div>
        ),
    },

    {
        key: 'category',
        label: 'Category',
        align: 'center',
        render: (blog) => (
            <Badge variant={'secondary'} className="rounded-full px-3 py-1 font-semibold capitalize">
                {blog.category?.name || 'Uncategorized'}
            </Badge>
        ),
    },
];
