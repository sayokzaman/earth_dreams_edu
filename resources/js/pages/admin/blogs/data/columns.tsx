import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';

export const blogColumns: GenericColumnDef<Blog>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (blog) => <span className="pl-4">{blog.id}</span>,
    },

    {
        key: 'title',
        label: 'Title',
        sortable: true,
        align: 'start',
        render: (blog) => (
            <Link href={route('admin.blogs.show', blog.id)} className="pl-3 text-blue-200 capitalize underline-offset-2 hover:underline">
                <TextWithBreaks text={blog.title} isLink />
            </Link>
        ),
    },

    {
        key: 'author',
        label: 'Author',
        sortable: true,
        align: 'start',
        render: (blog) => <span className="pl-3 capitalize">{blog.author.name}</span>,
    },

    {
        key: 'type',
        label: 'Type',
        sortable: true,
        align: 'center',
        render: (blog) => (
            <Badge variant={blog.type === 'blog' ? 'manual' : blog.type === 'event' ? 'active' : 'pending'} className="ml-3 font-bold capitalize">
                {blog.type}
            </Badge>
        ),
    },

    {
        key: 'date',
        label: 'Date',
        sortable: true,
        align: 'start',
        render: (blog) => <Badge className="ml-3 font-bold">{format(new Date(blog.date), 'hh:mm a - dd MMM yyyy')}</Badge>,
    },

    {
        key: 'category',
        label: 'Category',
        align: 'center',
        render: (blog) => {
            return (
                <Badge variant={'secondary'} className="font-bold capitalize">
                    {blog.category}
                </Badge>
            );
        },
    },
];
