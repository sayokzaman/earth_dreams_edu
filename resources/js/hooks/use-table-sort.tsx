import { useState } from 'react'

export function useTableSort<T extends { sort_by?: string; sort_to?: 'asc' | 'desc' | '' }>(filters: T, setFilters: (filters: T) => void) {
    const [sortKey, setSortKey] = useState(filters.sort_by || '')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>((filters.sort_to || '') as 'asc' | 'desc' | '')

    const setSort = (key: string, order: 'asc' | 'desc') => {
        setSortKey(key)
        setSortOrder(order)
        setFilters({ ...filters, sort_by: key, sort_to: order, page: 1 })
    }

    const clearSort = () => {
        setSortKey('')
        setSortOrder('')
        setFilters({ ...filters, sort_by: '', sort_to: '', page: 1 })
    }

    const getSortProps = (key: string) => ({
        sorted: sortKey === key ? (sortOrder as 'asc' | 'desc') : undefined,
        onSort: (desc?: boolean) => {
            if (desc === undefined) return clearSort()
            const order = desc ? 'desc' : 'asc'
            setSort(key, order)
        },
    })

    return { sortKey, sortOrder, setSort, clearSort, getSortProps }
}
