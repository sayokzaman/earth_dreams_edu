import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogFilter, defaultBlogFilters, useBlogFilters } from '@/hooks/filters/use-blog-filters';
import AppLayout from '@/layouts/app-layout';
import BlogActions from '@/pages/admin/blogs/actions';
import CategoryModal from '@/pages/admin/blogs/category-modal';
import { blogColumns } from '@/pages/admin/blogs/data/columns';
import { DeleteBlogDialog } from '@/pages/admin/blogs/delete-dialog';
import BlogFilters from '@/pages/admin/blogs/filters';
import BlogMobileRow from '@/pages/admin/blogs/mobile-row';
import { BreadcrumbItem } from '@/types';
import { Blog } from '@/types/blog';
import { TableData } from '@/types/table';
import { Head, Link } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

interface Props {
    blogs: TableData<Blog>;
    filters: Partial<typeof defaultBlogFilters>;
}

const AdminBlogsIndex = ({ blogs, filters: incomingFilters }: Props) => {
    const { filters, setFilters } = useBlogFilters(incomingFilters);

    const [deleteModalData, setDeleteModalData] = useState<Blog | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />

            <main className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-950">
                                    <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Blogs</span>
                                    <Badge variant="secondary" className="gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        {blogs.total} total
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blogs</h1>
                                <p className="mt-2 text-muted-foreground">Create and manage blog posts</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                            <CategoryModal />
                            <Link href={route('admin.blogs.create')}>
                                <Button size="lg" className="gap-2 whitespace-nowrap">
                                    <Plus className="h-4 w-4" />
                                    Add Blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <DataTable<Blog, BlogFilter>
                    data={blogs}
                    columns={blogColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultBlogFilters)}
                    rowId={(blog) => blog.id}
                    renderMobileRow={(blog) => <BlogMobileRow blog={blog} setBlogModal={(blog) => setDeleteModalData(blog)} />}
                    renderActions={(blog) => <BlogActions blog={blog} setBlogModal={(blog) => setDeleteModalData(blog)} />}
                    storageKey="blogsTable"
                >
                    <BlogFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>

            <DeleteBlogDialog blog={deleteModalData} setBlog={setDeleteModalData} />
        </AppLayout>
    );
};

export default AdminBlogsIndex;
