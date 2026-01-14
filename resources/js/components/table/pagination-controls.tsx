import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableData } from '@/types/table';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface Props<T> {
    data: TableData<T>;
    perPage?: string | number;
    setPerPage: (value: string | number) => void;
    setPage: (page: number) => void;
}

export default function PaginationControls<T>({ data, perPage, setPerPage, setPage }: Props<T>) {
    return (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <Select
                    value={`${perPage ?? data.total}`}
                    onValueChange={(value) => setPerPage(value === data.total.toString() ? data.total : Number(value))}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={`${perPage}`} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        <SelectItem value={data.total.toString()}>All</SelectItem>
                        {[20, 40, 60, 80, 100].map((n) => (
                            <SelectItem key={n} value={`${n}`}>
                                {n}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span>
                    {data.from} – {data.to} of {data.total}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" disabled={data.current_page === 1} onClick={() => setPage(1)}>
                    <DoubleArrowLeftIcon />
                </Button>
                <Button size="sm" variant="outline" disabled={data.current_page === 1} onClick={() => setPage(data.current_page - 1)}>
                    <ChevronLeftIcon />
                </Button>
                <span className="text-sm">
                    Page {data.current_page} of {data.last_page}
                </span>
                <Button size="sm" variant="outline" disabled={data.current_page === data.last_page} onClick={() => setPage(data.current_page + 1)}>
                    <ChevronRightIcon />
                </Button>
                <Button size="sm" variant="outline" disabled={data.current_page === data.last_page} onClick={() => setPage(data.last_page)}>
                    <DoubleArrowRightIcon />
                </Button>
            </div>
        </div>
    );
}
