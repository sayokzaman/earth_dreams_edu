import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlogFilter } from '@/hooks/filters/use-blog-filters';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface Props {
    filters: BlogFilter;
    setFilters: React.Dispatch<React.SetStateAction<BlogFilter>>;
}

export default function BlogFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-3 pb-2 md:w-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <Label>Search</Label>
                <Input
                    placeholder="Search title/author-name..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                />
            </div>

            <div className="grid">
                <Label className="mt-1.5 mb-1">Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            data-empty={!filters.date}
                            className="h-9 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            <CalendarIcon />
                            {filters.date ? format(filters.date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={filters.date ? new Date(filters.date) : undefined}
                            onSelect={(date) => setFilters({ ...filters, date: date ? format(new Date(date), 'yyyy-MM-dd') : '', page: 1 })}
                            className="w-full"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div>
                <Label>Blog Type</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Category</Label>
                <Input
                    placeholder="Search category..."
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                />
            </div>
        </div>
    );
}
