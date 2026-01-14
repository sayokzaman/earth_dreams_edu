import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { defaultLeadFilters, LeadFilter, useLeadFilters } from '@/hooks/filters/use-lead-filters';
import AppLayout from '@/layouts/app-layout';
import { CreateLeadDialog } from '@/pages/admin/leads/create-lead-dialog';
import LeadFilters from '@/pages/admin/leads/filters';
import LeadMobileRow from '@/pages/admin/leads/mobile-row';
import SubjectModal from '@/pages/admin/leads/subject-modal';
import { Lead } from '@/types/lead';
import { TableData } from '@/types/table';
import { Head, router } from '@inertiajs/react';
import { MessageSquare } from 'lucide-react';
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

            <main className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-orange-100 p-2.5 dark:bg-orange-950">
                                    <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Leads</span>
                                    <Badge variant="secondary" className="gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                                        {leads.total} total
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Leads</h1>
                                <p className="mt-2 text-muted-foreground">Track and manage student inquiries</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                            <SubjectModal />
                            <CreateLeadDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
                        </div>
                    </div>
                </div>

                <DataTable<Lead, LeadFilter>
                    data={leads}
                    columns={leadColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultLeadFilters)}
                    rowId={(lead) => lead.id}
                    renderMobileRow={(lead) => <LeadMobileRow lead={lead} />}
                    storageKey="leadsTable"
                >
                    <LeadFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>
        </AppLayout>
    );
};

export default LeadsIndex;
