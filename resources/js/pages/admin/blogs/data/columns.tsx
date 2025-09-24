import { GenericColumnDef } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';

type VariantType = 'blue' | 'green' | 'rose' | 'orange' | 'violet';

const statusVariants: VariantType[] = ['blue', 'green', 'rose', 'orange', 'violet'];

export const blogColumns: GenericColumnDef<Blog>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (blog) => <span className="pl-4">{blog.id}</span>,
    },
    {
        key: 'date',
        label: 'Date',
        sortable: true,
        align: 'start',
        render: (blog) => <Badge className="font-bold">{format(new Date(blog.date), 'HH:mm - dd MMM yyyy')}</Badge>,
    },
    {
        key: 'title',
        label: 'Title',
        sortable: true,
        align: 'start',
        render: (blog) => (
            <Link href={route('admin.blogs.show', blog.id)} className="pl-3 capitalize hover:underline underline-offset-2 text-blue-200">
                {blog.title}
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
        key: 'category',
        label: 'Category',
        align: 'center',
        render: (blog) => {
            const randomVariant = statusVariants[Math.floor(Math.random() * statusVariants.length)];

            return (
                <Badge variant={randomVariant} className="font-bold capitalize">
                    {blog.category}
                </Badge>
            );
        },
    },
];
