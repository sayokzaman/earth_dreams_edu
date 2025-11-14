import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CourseFilter } from '@/hooks/filters/use-course-filters';

interface Props {
    filters: CourseFilter;
    setFilters: React.Dispatch<React.SetStateAction<CourseFilter>>;
}

export default function CourseFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-3 pb-2 md:w-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <Label>Search</Label>
                <Input
                    placeholder="Search title/faculty-name..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                />
            </div>

            <div>
                <Label>Study Level</Label>
                <Select value={filters.study_level} onValueChange={(value) => setFilters({ ...filters, study_level: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Study Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="masters">Masters</SelectItem>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="top_up">Top Up</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Duration (Months)</Label>
                <div className="flex gap-2">
                    <Input placeholder="From" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value, page: 1 })} />

                    <Input placeholder="To" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value, page: 1 })} />
                </div>
            </div>
        </div>
    );
}
