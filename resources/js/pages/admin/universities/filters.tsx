import DateRangePicker from '@/components/date-range-picker';
import { Input } from '@/components/ui/input';
import { UniversityFilter } from '@/hooks/filters/use-university-filters';

interface Props {
    filters: UniversityFilter;
    setFilters: React.Dispatch<React.SetStateAction<UniversityFilter>>;
}

export default function UniversityFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-3 pb-2 md:w-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <Input
                placeholder="Search name/location..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
            />

            <DateRangePicker value={filters} onChange={setFilters} placeholder="From - To" />
        </div>
    );
}
