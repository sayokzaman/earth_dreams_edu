import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { UserFilter, defaultUserFilters, useUserFilters } from '@/hooks/filters/use-user-filters';
import AppLayout from '@/layouts/app-layout';
import UserActions from '@/pages/admin/users/actions';
import CreateEditUserDialog from '@/pages/admin/users/create-edit-dialog';
import { userColumns } from '@/pages/admin/users/data/columns';
import { DeleteUserDialog } from '@/pages/admin/users/delete-dialog';
import UserFilters from '@/pages/admin/users/filters';
import { BreadcrumbItem, User } from '@/types';
import { TableData } from '@/types/table';
import { Head, router } from '@inertiajs/react';
import { Users as UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Props {
    users: TableData<User>;
    filters: Partial<typeof defaultUserFilters>;
}

const AdminUsersIndex = ({ users, filters: incomingFilters }: Props) => {
    const { filters, setFilters } = useUserFilters(incomingFilters);

    const [createEditModalData, setCreateEditModalData] = useState<User | null>(null);
    const [deleteModalData, setDeleteModalData] = useState<User | null>(null);
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
            <Head title="Users" />
            <main className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-rose-100 p-2.5 dark:bg-rose-950">
                                    <UsersIcon className="h-5 w-5 text-rose-600 dark:text-rose-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">Users</span>
                                    <Badge variant="secondary" className="gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                                        {users.total} total
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Users</h1>
                                <p className="mt-2 text-muted-foreground">Manage all user accounts and permissions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CreateEditUserDialog
                                user={createEditModalData}
                                setModalData={setCreateEditModalData}
                                open={openCreateDialog}
                                onOpenChange={setOpenCreateDialog}
                            />
                        </div>
                    </div>
                </div>

                <DataTable<User, UserFilter>
                    data={users}
                    columns={userColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultUserFilters)}
                    rowId={(user) => user.id}
                    renderActions={(user) => (
                        <UserActions
                            user={user}
                            setDeleteModalData={(user) => setDeleteModalData(user)}
                            setCreateEditModalData={(user) => setCreateEditModalData(user)}
                        />
                    )}
                    storageKey="usersTable"
                >
                    <UserFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>

            <DeleteUserDialog user={deleteModalData} setUser={setDeleteModalData} />
        </AppLayout>
    );
};

export default AdminUsersIndex;
