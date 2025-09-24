import { TableFilterBase } from '@/types/table';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export interface BlogsFilter extends TableFilterBase {
    search: string;
    category: string;
}

export const defaultBlogFilters: BlogsFilter = {
    search: '',
    category: '',
    from: '',
    to: '',
    trashed: '',
    per_page: '',
    page: '',
    sort_by: '',
    sort_to: '',
};

export const useBlogFilters = (incoming: Partial<BlogsFilter> = {}) => {
    const [filters, setFilters] = useState<BlogsFilter>({
        ...defaultBlogFilters,
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
            router.get(route('expenses.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return { filters, setFilters };
};
