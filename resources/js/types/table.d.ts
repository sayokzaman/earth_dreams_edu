export interface PaginationData {
    current_page: number;
    from: number | null;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
        page: number | null;
    }[];
    path: string;
    next_page_url: string | null;

    per_page: number;
    to: number | null;
    total: number;
}
export interface TableData<T> extends PaginationData {
    data: T[];
}

export interface BaseFilter {
    from?: string;
    to?: string;
    trashed?: string;
    per_page?: number | string;
    page?: number | string;
    current_page?: number | string;
    last_page?: number | string;
}

type SortableFilter = {
    sort_by?: string;
    sort_to?: '' | 'asc' | 'desc';
};

export type TableFilterBase = BaseFilter & SortableFilter;
