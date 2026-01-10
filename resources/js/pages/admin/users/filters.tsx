import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserFilter } from '@/hooks/filters/use-user-filters';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface Props {
    filters: UserFilter;
    setFilters: React.Dispatch<React.SetStateAction<UserFilter>>;
}

const roleOptions = [
    { label: 'Super Admin', value: 'super-admin' },
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
];

export default function UserFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-3 pb-2 md:w-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <Label>Search</Label>
                <Input
                    placeholder="Search name, email, phone..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                />
            </div>

            <div>
                <Label>Roles</Label>
                <MultiSelect
                    options={roleOptions}
                    onValueChange={(value) => setFilters({ ...filters, roles: value, page: 1 })}
                    defaultValue={filters.roles}
                    placeholder="Select roles"
                    variant="default"
                    animation={2}
                    maxCount={2}
                    className="min-h-9"
                />
            </div>

            <div className="grid">
                <Label className="mt-1.5 mb-1">Joined Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            data-empty={!filters.joined_date}
                            className="h-9 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            <CalendarIcon />
                            {filters.joined_date ? format(filters.joined_date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={filters.joined_date ? new Date(filters.joined_date) : undefined}
                            onSelect={(date) => setFilters({ ...filters, joined_date: date ? format(new Date(date), 'yyyy-MM-dd') : '', page: 1 })}
                            className="w-full"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
