import { TableFilterBase } from '@/types/table';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export interface CourseFilter extends TableFilterBase {
    search: string;
    category: string;
}

export const defaultCourseFilters: CourseFilter = {
    search: '',
    category: '',
    from: '',
    to: '',
    per_page: '',
    page: '',
    sort_by: '',
    sort_to: '',
};

export const useCourseFilters = (incoming: Partial<CourseFilter> = {}) => {
    const [filters, setFilters] = useState<CourseFilter>({
        ...defaultCourseFilters,
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
            router.get(route('admin.courses.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return { filters, setFilters };
};
