import { DataTable } from '@/components/table/data-table';
import { defaultLeadFilters, LeadFilter, useLeadFilters } from '@/hooks/filters/use-lead-filters';
import AppLayout from '@/layouts/app-layout';
import { CreateLeadDialog } from '@/pages/admin/leads/create-lead-dialog';
import LeadFilters from '@/pages/admin/leads/filters';
import SubjectModal from '@/pages/admin/leads/subject-modal';
import { Lead } from '@/types/lead';
import { TableData } from '@/types/table';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
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
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('create') === 'true') {
            setOpenCreateDialog(true);
            // Remove the create param from URL
            router.visit(window.location.pathname, { preserveState: true, replace: true });
        }
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />

            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Leads</h2>
                        <p className="text-base text-muted-foreground">Track and manage student inquiries</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <SubjectModal />

                        <CreateLeadDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
                    </div>
                </div>

                <DataTable<Lead, LeadFilter>
                    data={leads}
                    columns={leadColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultLeadFilters)}
                    rowId={(lead) => lead.id}
                    // renderMobileRow={(expense) => (
                    //     <ExpenseMobileRow expense={expense} setExpenseModal={setExpenseModal} setDeleteModal={setDeleteModal} />
                    // )}
                    storageKey="leadsTable"
                >
                    <LeadFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>
        </AppLayout>
    );
};

export default LeadsIndex;
