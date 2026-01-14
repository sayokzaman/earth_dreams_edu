import { DataTableColumnHeader } from '@/components/table/column-header';
import DataTableToolbar from '@/components/table/data-toolbar';
import PaginationControls from '@/components/table/pagination-controls';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTableSort } from '@/hooks/use-table-sort';
import { cn } from '@/lib/utils';
import { TableData, TableFilterBase } from '@/types/table';

import { useEffect, useState } from 'react';

export type GenericColumnDef<T> = {
    key: string;
    label: string;
    render: (row: T) => React.ReactNode;
    sortable?: boolean;
    align?: 'center' | 'start' | 'end';
    visible?: boolean;
};

interface Props<T, F extends TableFilterBase> {
    data: TableData<T>;
    columns: GenericColumnDef<T>[];
    filters: F;
    setFilters: React.Dispatch<React.SetStateAction<F>>;
    onReset: () => void;
    children?: React.ReactNode;
    renderActions?: (row: T) => React.ReactNode;
    renderApproval?: (row: T) => React.ReactNode;
    renderMobileRow?: (row: T) => React.ReactNode;
    rowId?: (row: T) => React.Key;
    storageKey?: string;
}

function getStorageKeys(base: string = 'genericTable') {
    return {
        columns: `${base}.visibleColumns`,
        sortKey: `${base}.sortKey`,
        sortOrder: `${base}.sortOrder`,
    };
}

export function DataTable<T, F extends TableFilterBase>({
    data,
    columns,
    filters,
    setFilters,
    onReset,
    children,
    renderActions,
    renderApproval,
    renderMobileRow,
    rowId,
    storageKey = 'genericTable',
}: Props<T, F>) {
    const STORAGE_KEYS = getStorageKeys(storageKey);
    const isMobile = useIsMobile();

    const defaultVisible = Object.fromEntries(columns.map((col) => [col.key, col.visible !== false]));
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        () => JSON.parse(localStorage.getItem(STORAGE_KEYS.columns) || 'null') || defaultVisible,
    );

    const { sortKey, sortOrder, getSortProps, clearSort } = useTableSort(filters, setFilters);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.columns, JSON.stringify(visibleColumns));
    }, [visibleColumns, STORAGE_KEYS.columns]);

    useEffect(() => {
        if (sortKey) localStorage.setItem(STORAGE_KEYS.sortKey, sortKey);
        else localStorage.removeItem(STORAGE_KEYS.sortKey);

        if (sortOrder) localStorage.setItem(STORAGE_KEYS.sortOrder, sortOrder);
        else localStorage.removeItem(STORAGE_KEYS.sortOrder);
    }, [sortKey, sortOrder, STORAGE_KEYS.sortKey, STORAGE_KEYS.sortOrder]);

    return (
        <div className="space-y-4">
            <DataTableToolbar
                onReset={() => {
                    clearSort();
                    localStorage.removeItem(STORAGE_KEYS.columns);
                    localStorage.removeItem(STORAGE_KEYS.sortKey);
                    localStorage.removeItem(STORAGE_KEYS.sortOrder);
                    onReset();
                }}
                viewOptions={columns.map(({ key, label }) => ({ key, label }))}
                visible={visibleColumns}
                onToggle={(key, show) => setVisibleColumns((prev) => ({ ...prev, [key]: show }))}
            >
                {children}
            </DataTableToolbar>

            {/* Desktop/Table view */}
            {!isMobile && (
                <div className="overflow-hidden overflow-x-auto rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map(
                                    (col) =>
                                        visibleColumns[col.key] && (
                                            <TableHead key={col.key} className={col.align ? `text-${col.align}` : ''}>
                                                {col.sortable ? (
                                                    <DataTableColumnHeader title={col.label} {...getSortProps(col.key)} align={col.align} />
                                                ) : (
                                                    col.label
                                                )}
                                            </TableHead>
                                        ),
                                )}
                                {renderApproval && <TableHead className="text-center">Approval</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.length > 0 ? (
                                data.data.map((row, i) => (
                                    <ContextMenu key={rowId?.(row) ?? i}>
                                        <ContextMenuTrigger asChild>
                                            <TableRow
                                                tabIndex={0}
                                                className={cn('select-text md:select-text', isMobile ? 'select-none' : '')}
                                                style={{ WebkitTouchCallout: 'none' }}
                                                onContextMenuCapture={(e) => {
                                                    const target = e.target as HTMLElement | null;
                                                    const selection = window.getSelection?.();
                                                    const hasSelection = !!selection && selection.toString().trim().length > 0;

                                                    const isInteractiveTarget =
                                                        target instanceof Element &&
                                                        !!target.closest(
                                                            'a[href], button, input, textarea, select, [contenteditable="true"], img, video, audio, svg, pre, code',
                                                        );

                                                    // Allow native browser context menu on interactive elements or when text is selected
                                                    if (hasSelection || isInteractiveTarget) {
                                                        e.stopPropagation();
                                                    }
                                                }}
                                            >
                                                {columns.map(
                                                    (col) =>
                                                        visibleColumns[col.key] && (
                                                            <TableCell key={col.key} className={col.align ? `text-${col.align}` : ''}>
                                                                {col.render(row)}
                                                            </TableCell>
                                                        ),
                                                )}
                                                {renderApproval && <TableCell className="text-center">{renderApproval(row)}</TableCell>}
                                            </TableRow>
                                        </ContextMenuTrigger>

                                        {renderActions && <ContextMenuContent>{renderActions(row)}</ContextMenuContent>}
                                    </ContextMenu>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={Object.values(visibleColumns).filter(Boolean).length + (renderActions ? 1 : 0)}
                                        className="py-6 text-center"
                                    >
                                        No data found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Mobile stacked view */}
            {isMobile && (
                <div className="space-y-3">
                    {data.data.length > 0 ? (
                        data.data.map((row, i) => (
                            <div key={rowId?.(row) ?? i}>
                                {renderMobileRow ? (
                                    <div data-row-container>{renderMobileRow(row)}</div>
                                ) : (
                                    <div className="divide-y divide-border rounded border bg-background p-3 shadow-xs">
                                        {columns.map(
                                            (col) =>
                                                visibleColumns[col.key] && (
                                                    <div key={col.key} className="py-2 first:pt-0 last:pb-0">
                                                        <div className="text-[10px] tracking-wide text-muted-foreground uppercase">{col.label}</div>
                                                        <div className="mt-1 text-sm text-foreground">{col.render(row)}</div>
                                                    </div>
                                                ),
                                        )}
                                        {renderApproval && (
                                            <div className="py-2 first:pt-0 last:pb-0">
                                                <div className="text-[10px] tracking-wide text-muted-foreground uppercase">Approval</div>
                                                <div className="mt-1">{renderApproval(row)}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="rounded border p-6 text-center text-sm text-muted-foreground">No data found.</div>
                    )}
                </div>
            )}

            <PaginationControls
                data={data}
                perPage={filters.per_page}
                setPerPage={(val) => setFilters((prev) => ({ ...prev, per_page: val, page: 1 }))}
                setPage={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
        </div>
    );
}
