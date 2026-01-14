import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
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
import { Building2, Plus } from 'lucide-react';
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

            <main className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-950">
                                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Institutions</span>
                                    <Badge variant="secondary" className="gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                        {universities.total} total
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Universities</h1>
                                <p className="mt-2 text-muted-foreground">Manage and browse all university profiles in your database</p>
                            </div>
                        </div>
                        <Link href={route('admin.universities.create')}>
                            <Button size="lg" className="gap-2 whitespace-nowrap">
                                <Plus className="h-4 w-4" />
                                Add University
                            </Button>
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
                    renderMobileRow={(university) => (
                        <UniversityMobileRow university={university} setUniversityModal={(university) => setDeleteModalData(university)} />
                    )}
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
