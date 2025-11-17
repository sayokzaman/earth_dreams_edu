import { DataTable } from '@/components/table/data-table';
import { UserFilter, defaultUserFilters, useUserFilters } from '@/hooks/filters/use-user-filters';
import AppLayout from '@/layouts/app-layout';
import CreateUserDialog from '@/pages/admin/users/create-dialog';
import { userColumns } from '@/pages/admin/users/data/columns';
import { BreadcrumbItem, User } from '@/types';
import { TableData } from '@/types/table';
import { Head } from '@inertiajs/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { useState } from 'react';

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

    const [deleteModalData, setDeleteModalData] = useState<User | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-base text-muted-foreground">
                            Showing results for
                            <span className="ml-1 font-semibold text-foreground">
                                {format(filters.from ? filters.from : startOfMonth(new Date()), 'do MMMM')} -{' '}
                                {format(filters.to ? filters.to : endOfMonth(new Date()), 'do MMMM, yyyy')}
                            </span>
                        </p>
                    </div>
                    <CreateUserDialog />
                </div>

                <DataTable<User, UserFilter>
                    data={users}
                    columns={userColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultUserFilters)}
                    rowId={(user) => user.id}
                    // renderMobileRow={(expense) => (
                    //     <ExpenseMobileRow expense={expense} setExpenseModal={setExpenseModal} setDeleteModal={setDeleteModal} />
                    // )}
                    // renderActions={(user) => <UserActions user={user} setUserModal={(user) => setDeleteModalData(user)} />}
                    storageKey="usersTable"
                >
                    {/* <UserFilters filters={filters} setFilters={setFilters} /> */}
                </DataTable>
            </main>

            {/* <DeleteUserDialog user={deleteModalData} setUser={setDeleteModalData} /> */}
        </AppLayout>
    );
};

export default AdminUsersIndex;
