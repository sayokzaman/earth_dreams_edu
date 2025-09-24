import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Blog } from '@/types/blog';
import { Head } from '@inertiajs/react';

type Props = {
    blog: Blog;
};

const AdminBlogShow = ({ blog }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blogs',
            href: '/blogs',
        },
        {
            title: blog.title,
            href: `/blogs/${blog.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />
            <main className="p-4">AdminBlogShow</main>
        </AppLayout>
    );
};

export default AdminBlogShow;
