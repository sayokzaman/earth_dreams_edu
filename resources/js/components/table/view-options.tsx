import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'

interface ColumnToggle {
    key: string
    label: string
}

interface ViewOptionsProps {
    columns: ColumnToggle[]
    visible: Record<string, boolean>
    onToggle: (key: string, show: boolean) => void
}

export default function ViewOptions({ columns, visible, onToggle }: ViewOptionsProps) {
    const hiddenCount = columns.filter((col) => !visible[col.key]).length
    const resetColumns = (value: boolean) => {
        columns.forEach((col) => onToggle(col.key, value))
    }

    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                    <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                    View
                    {hiddenCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-orange-700 text-[10px] text-white">
                            <span>{hiddenCount}</span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                        key={column.key}
                        checked={!!visible[column.key]}
                        onCheckedChange={(checked) => onToggle(column.key, checked)}
                    >
                        {column.label}
                    </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuSeparator />
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                            resetColumns(true)
                            setOpen(false)
                        }}
                    >
                        <EyeIcon className="h-4 w-4" />
                        Show All
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
