import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { BlogFilter, defaultBlogFilters, useBlogFilters } from '@/hooks/filters/use-blog-filters';
import AppLayout from '@/layouts/app-layout';
import BlogActions from '@/pages/admin/blogs/actions';
import { blogColumns } from '@/pages/admin/blogs/data/columns';
import { DeleteBlogDialog } from '@/pages/admin/blogs/delete-dialog';
import BlogFilters from '@/pages/admin/blogs/filters';
import { BreadcrumbItem } from '@/types';
import { Blog } from '@/types/blog';
import { TableData } from '@/types/table';
import { Head, Link } from '@inertiajs/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
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

            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Blogs</h2>
                        <p className="text-base text-muted-foreground">
                            Showing results for
                            <span className="ml-1 font-semibold text-foreground">
                                {format(filters.from ? filters.from : startOfMonth(new Date()), 'do MMMM')} -{' '}
                                {format(filters.to ? filters.to : endOfMonth(new Date()), 'do MMMM, yyyy')}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                        <Link href={route('admin.blogs.create')}>
                            <Button
                                // onClick={() => {
                                //     setBlogModal(null);
                                //     setOpenBlogModal(true);
                                // }}
                                className="w-full sm:w-auto"
                            >
                                Add New Blog
                            </Button>
                        </Link>
                    </div>
                </div>

                <DataTable<Blog, BlogFilter>
                    data={blogs}
                    columns={blogColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultBlogFilters)}
                    rowId={(blog) => blog.id}
                    // renderMobileRow={(expense) => (
                    //     <ExpenseMobileRow expense={expense} setExpenseModal={setExpenseModal} setDeleteModal={setDeleteModal} />
                    // )}
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
