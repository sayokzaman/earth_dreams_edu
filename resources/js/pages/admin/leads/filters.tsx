import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeadFilter } from '@/hooks/filters/use-lead-filters';
import { country_of_residence, studyLevels, subjects } from '@/lib/constants';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface Props {
    filters: LeadFilter;
    setFilters: React.Dispatch<React.SetStateAction<LeadFilter>>;
}

export default function LeadFilters({ filters, setFilters }: Props) {
    return (
        <div className="grid w-full grid-cols-1 gap-3 pb-2 md:w-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <Label>Search</Label>
                <Input
                    placeholder="Search name/email/phone..."
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
                <Label>Study Type</Label>
                <Select value={filters.study_type} onValueChange={(value) => setFilters({ ...filters, study_type: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {studyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1).replace('_', ' ')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Subject Interested</Label>
                <Select value={filters.subject_interested} onValueChange={(value) => setFilters({ ...filters, subject_interested: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                                {subject.charAt(0).toUpperCase() + subject.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Country of Residence</Label>
                <Select
                    value={filters.country_of_residence}
                    onValueChange={(value) => setFilters({ ...filters, country_of_residence: value, page: 1 })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {country_of_residence.map((country) => (
                            <SelectItem key={country.country_name} value={country.country_name}>
                                {country.country_name.charAt(0).toUpperCase() + country.country_name.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Currently in UK</Label>
                <Select value={filters.in_uk_now} onValueChange={(value) => setFilters({ ...filters, in_uk_now: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Options" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">In UK</SelectItem>
                        <SelectItem value="0">Not in UK</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Whatsapp</Label>
                <Select value={filters.is_whatsapp} onValueChange={(value) => setFilters({ ...filters, is_whatsapp: value, page: 1 })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Options" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Has Whatsapp</SelectItem>
                        <SelectItem value="0">No Whatsapp</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
