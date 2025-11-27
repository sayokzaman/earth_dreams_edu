// get user roles
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

type Props = {
    roles: string[];
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isElevated: boolean;
    isManager: boolean;
};

export function useRoles(): Props {
    const { auth } = usePage<SharedData>().props;

    if (!auth.user) {
        return {
            roles: [],
            isSuperAdmin: false,
            isAdmin: false,
            isElevated: false,
            isManager: false,
        };
    }

    const roles = auth.user.roles ? auth.user.roles.map((role) => role.name) : [];

    const isSuperAdmin: boolean = roles.includes('super-admin');
    const isAdmin: boolean = roles.includes('admin');
    const isElevated: boolean = isSuperAdmin || isAdmin;
    const isManager: boolean = roles.includes('manager');

    return { roles, isSuperAdmin, isElevated, isAdmin, isManager };
}
