import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react'
import { MoreVertical, SquarePenIcon, Tag, Trash2Icon } from 'lucide-react';

const UniversityMobileRow = ({ university }: { university: University }) => {
    return (
        <div className="relative rounded border bg-background p-3 shadow-xs">
            <div className="absolute top-2.5 right-2.5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 rounded-full border text-muted-foreground">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[200px]">
                        <DropdownMenuLabel>
                            <div className="truncate">{university.name}</div>
                            {/* <div className="truncate text-xs text-foreground/75">SKU: {product.sku}</div> */}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SquarePenIcon /> <span>Edit University</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2Icon /> <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 pr-10">
                    <Tag className="h-4 w-4 text-amber-600" />
                    <Link href={route('admin.universities.show', university.id)} className="font-semibold underline-offset-2 hover:underline">
                        {university.name}
                    </Link>
                </div>
                <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Name</div>
                    <div className="text-sm capitalize">{university.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="rounded border p-2 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase">DB Rate</div>
                        {/* <div className="text-sm font-semibold">{formatBDT(product.db_rate)}</div> */}
                    </div>
                    <div className="rounded border p-2 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase">ID</div>
                        <div className="text-sm font-semibold">{university.id}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityMobileRow;
