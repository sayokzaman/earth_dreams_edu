import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { defaultUniversityFilters, UniversityFilter, useUniversityFilters } from '@/hooks/filters/use-university-filters';
import AppLayout from '@/layouts/app-layout';
import UniversityActions from '@/pages/admin/universities/actions';
import { universityColumns } from '@/pages/admin/universities/data/columns';
import { DeleteUniversityDialog } from '@/pages/admin/universities/delete-dialog';
import UniversityFilters from '@/pages/admin/universities/filters';
import UniversityMobileRow from '@/pages/admin/universities/mobile-row';
import { BreadcrumbItem } from '@/types';
import { TableData } from '@/types/table';
import { University } from '@/types/university';
import { Head, Link } from '@inertiajs/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Universities',
        href: '/universities',
    },
];

interface Props {
    universities: TableData<University>;
    filters: Partial<typeof defaultUniversityFilters>;
}

const AdminUniversitiesIndex = ({ universities, filters: incomingFilters }: Props) => {
    const { filters, setFilters } = useUniversityFilters(incomingFilters);

    const [deleteModalData, setDeleteModalData] = useState<University | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Universities" />

            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Universities</h2>
                        <p className="text-base text-muted-foreground">
                            Showing results for
                            <span className="ml-1 font-semibold text-foreground">
                                {format(filters.from ? filters.from : startOfMonth(new Date()), 'do MMMM')} -{' '}
                                {format(filters.to ? filters.to : endOfMonth(new Date()), 'do MMMM, yyyy')}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                        <Link href={route('admin.universities.create')}>
                            <Button className="w-full sm:w-auto">Add New University</Button>
                        </Link>
                    </div>
                </div>

                <DataTable<University, UniversityFilter>
                    data={universities}
                    columns={universityColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultUniversityFilters)}
                    rowId={(university) => university.id}
                    renderMobileRow={(university) => <UniversityMobileRow university={university} />}
                    renderActions={(university) => (
                        <UniversityActions university={university} setUniversityModal={(university) => setDeleteModalData(university)} />
                    )}
                    storageKey="universityTable"
                >
                    <UniversityFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>

            <DeleteUniversityDialog university={deleteModalData} setUniversity={setDeleteModalData} />
        </AppLayout>
    );
};

export default AdminUniversitiesIndex;
