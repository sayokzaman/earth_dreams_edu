import { TableFilterBase } from '@/types/table';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export interface UniversityFilter extends TableFilterBase {
    search: string;
}

export const defaultUniversityFilters: UniversityFilter = {
    search: '',
    from: undefined,
    to: undefined,
    per_page: '',
    page: '',
    sort_by: '',
    sort_to: '',
};

export const useUniversityFilters = (incoming: Partial<UniversityFilter> = {}) => {
    const [filters, setFilters] = useState<UniversityFilter>({
        ...defaultUniversityFilters,
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
            router.get(route('admin.universities.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return { filters, setFilters };
};
