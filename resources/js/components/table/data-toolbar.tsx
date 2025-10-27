import ViewOptions from '@/components/table/view-options'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleXIcon, MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'

interface ViewOption {
    key: string
    label: string
}

interface DataTableToolbarProps {
    children?: React.ReactNode
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    onReset?: () => void
    viewOptions: ViewOption[]
    visible: Record<string, boolean>
    onToggle: (key: string, show: boolean) => void
}

export default function DataTableToolbar({ children, showFilters, setShowFilters, onReset, viewOptions, visible, onToggle }: DataTableToolbarProps) {
    const hasQueryParams = !!new URLSearchParams(location.search).toString()

    return (
        <div className="mb-4 flex flex-col pt-4 sm:mb-0 sm:gap-3">
            {/* Top Control Bar */}
            <div className="flex flex-col justify-end gap-2 sm:flex-row sm:items-center">
                <div className="flex justify-end gap-2">
                    {hasQueryParams && (
                        <Button variant="secondary" className="h-8 flex-1 px-3" onClick={onReset}>
                            <CircleXIcon className="mr-1 h-4 w-4" />
                            Clear Filters
                        </Button>
                    )}

                    <Button className="h-9 px-3" onClick={() => setShowFilters(!showFilters)} variant="outline">
                        {!showFilters ? (
                            <>
                                <PlusIcon className="mr-1 h-4 w-4" />
                                Filters
                            </>
                        ) : (
                            <>
                                <MinusIcon className="mr-1 h-4 w-4" />
                                Collapse
                            </>
                        )}
                    </Button>

                    <ViewOptions columns={viewOptions} visible={visible} onToggle={onToggle} />
                </div>
            </div>

            {/* Filters Grid */}
            <div
                className={cn(
                    'overflow-hidden px-1 transition-all duration-300 ease-in-out sm:pt-1',
                    showFilters ? 'h-auto pt-4 opacity-100 sm:mb-3' : 'h-0 opacity-0',
                )}
            >
                {children}
            </div>
        </div>
    )
}
