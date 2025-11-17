import { TableFilterBase } from '@/types/table';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export interface UserFilter extends TableFilterBase {
    search: string;
    type: string;
    category: string;
    date: string;
}

export const defaultUserFilters: UserFilter = {
    search: '',
    type: '',
    category: '',
    date: '',
    from: '',
    to: '',
    per_page: '',
    page: '',
    sort_by: '',
    sort_to: '',
};

export const useUserFilters = (incoming: Partial<UserFilter> = {}) => {
    const [filters, setFilters] = useState<UserFilter>({
        ...defaultUserFilters,
        ...incoming,
    });

    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        const query: Record<string, string | number> = {};

        Object.entries(filters).forEach(([key, val]) => {
            if (val !== '' && val !== '__all__' && val !== undefined && val !== null) {
                query[key] = val;
            }
        });

        const timeout = setTimeout(() => {
            router.get(route('admin.users.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return { filters, setFilters };
};
