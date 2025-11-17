// get user roles
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

type Props = {
    roles: string[];
    isAdmin: boolean;
    isManager: boolean;
};

export function useRoles(): Props {
    const { auth } = usePage<SharedData>().props;

    if (!auth.user) {
        return {
            roles: [],
            isAdmin: false,
            isManager: false,
        };
    }

    const roles = auth.user.roles ? auth.user.roles.map((role) => role.name) : [];

    const isAdmin: boolean = roles.includes('admin');
    const isManager: boolean = roles.includes('manager');

    return { roles, isAdmin, isManager };
}
