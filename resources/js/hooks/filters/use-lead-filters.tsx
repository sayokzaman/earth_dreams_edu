import { TableFilterBase } from '@/types/table';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export interface LeadFilter extends TableFilterBase {
    search: string;
    category: string;
}

export const defaultLeadFilters: LeadFilter = {
    search: '',
    category: '',
    from: '',
    to: '',
    per_page: '',
    page: '',
    sort_by: '',
    sort_to: '',
};

export const useLeadFilters = (incoming: Partial<LeadFilter> = {}) => {
    const [filters, setFilters] = useState<LeadFilter>({
        ...defaultLeadFilters,
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
            router.get(route('admin.leads.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return { filters, setFilters };
};
