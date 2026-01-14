import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UniversityFilter } from '@/hooks/filters/use-university-filters';
import { Search } from 'lucide-react';

interface Props {
    filters: UniversityFilter;
    setFilters: React.Dispatch<React.SetStateAction<UniversityFilter>>;
}

export default function UniversityFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:w-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <Label className="text-sm font-semibold">Search</Label>
                    <span className="text-xs text-muted-foreground">Name or location</span>
                </div>
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-9"
                        placeholder="Search name or location"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                    />
                </div>
            </div>

            {/* TODO: fix date range */}
            {/* <DateRangePicker value={filters} onChange={setFilters} placeholder="From - To" /> */}
        </div>
    );
}
