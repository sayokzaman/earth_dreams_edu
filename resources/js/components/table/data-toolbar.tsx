import ViewOptions from '@/components/table/view-options';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircleXIcon, FilterIcon } from 'lucide-react';
import React from 'react';

interface ViewOption {
    key: string;
    label: string;
}

interface DataTableToolbarProps {
    children?: React.ReactNode;
    onReset?: () => void;
    viewOptions: ViewOption[];
    visible: Record<string, boolean>;
    onToggle: (key: string, show: boolean) => void;
}

export default function DataTableToolbar({ children, onReset, viewOptions, visible, onToggle }: DataTableToolbarProps) {
    const hasQueryParams = !!new URLSearchParams(location.search).toString();

    return (
        <Card className="mb-4 flex flex-col gap-4 rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-4 shadow-sm sm:gap-3 sm:p-5">
            {/* Top Control Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FilterIcon className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                        <div>Filters</div>
                        <div className="text-xs font-normal text-muted-foreground">Refine the results below</div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    {hasQueryParams && (
                        <Button variant="secondary" className="h-9 px-3" onClick={onReset}>
                            <CircleXIcon className="mr-1 h-4 w-4" />
                            Clear
                        </Button>
                    )}
                    <ViewOptions columns={viewOptions} visible={visible} onToggle={onToggle} />
                </div>
            </div>

            {/* Filters Grid */}
            <div className="rounded-lg border bg-card/50 p-3 sm:p-4">{children}</div>
        </Card>
    );
}
