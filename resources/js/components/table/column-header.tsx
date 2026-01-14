import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    sorted?: 'asc' | 'desc';
    onSort?: (desc: boolean | undefined) => void;
    onHide?: () => void;
    align?: 'start' | 'end' | 'center';
}

export function DataTableColumnHeader({ title, sorted, onSort, onHide, align = 'start', className, ...props }: DataTableColumnHeaderProps) {
    return (
        <div className={cn('flex items-center space-x-2', className, align && `justify-${align}`)} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
                        <span>{title}</span>
                        {sorted === 'desc' ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : sorted === 'asc' ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuItem
                        disabled={!onSort}
                        onClick={() => {
                            setTimeout(() => onSort?.(false), 0);
                        }}
                    >
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={!onSort}
                        onClick={() => {
                            setTimeout(() => onSort?.(true), 0);
                        }}
                    >
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    {sorted && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onSort?.(undefined)}>
                                <CaretSortIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                Clear Sort
                            </DropdownMenuItem>
                        </>
                    )}

                    {onHide && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onHide}>
                                <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                Hide
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
