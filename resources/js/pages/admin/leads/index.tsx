import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { defaultLeadFilters, LeadFilter, useLeadFilters } from '@/hooks/filters/use-lead-filters';
import AppLayout from '@/layouts/app-layout';
import { Lead } from '@/types/lead';
import { TableData } from '@/types/table';
import { Head, Link } from '@inertiajs/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { leadColumns } from './data/columns';

const breadcrumbs = [
    {
        title: 'Leads',
        href: '/leads',
    },
];

interface Props {
    leads: TableData<Lead>;
    filters: Partial<typeof defaultLeadFilters>;
}

const LeadsIndex = ({ leads, filters: incomingFilters }: Props) => {
    const { filters, setFilters } = useLeadFilters(incomingFilters);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />

            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Leads</h2>
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

                <DataTable<Lead, LeadFilter>
                    data={leads}
                    columns={leadColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultLeadFilters)}
                    rowId={(blog) => blog.id}
                    // renderMobileRow={(expense) => (
                    //     <ExpenseMobileRow expense={expense} setExpenseModal={setExpenseModal} setDeleteModal={setDeleteModal} />
                    // )}
                    storageKey="blogsTable"
                >
                    {/* <BlogFilters filters={filters} setFilters={setFilters} /> */}
                    {null}
                </DataTable>
            </main>
        </AppLayout>
    );
};

export default LeadsIndex;
