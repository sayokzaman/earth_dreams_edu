import { DataTable } from '@/components/table/data-table';
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
            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-base text-muted-foreground">Manage all user accounts and permissions</p>
                    </div>
                    <CreateEditUserDialog
                        user={createEditModalData}
                        setModalData={setCreateEditModalData}
                        open={openCreateDialog}
                        onOpenChange={setOpenCreateDialog}
                    />
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
