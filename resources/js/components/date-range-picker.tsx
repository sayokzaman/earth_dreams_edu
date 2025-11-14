import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

type DateRangePickerProps = {
    value?: DateRange;
    onChange: (range: DateRange | undefined) => void;
    placeholder?: string;
    alignIcon?: 'start' | 'end';
};

export default function DateRangePicker({ value, onChange, placeholder, alignIcon = 'start' }: DateRangePickerProps) {
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(value);
    const [currentMonth, setCurrentMonth] = useState<Date>(dateRange?.from ?? new Date());

    const isMobile = useIsMobile();

    useEffect(() => {
        setDateRange(value);
        if (value?.from) {
            setCurrentMonth(value.from);
        }
    }, [value]);

    if (isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'flex justify-start font-normal',
                            !value?.from && !value?.to ? 'text-muted-foreground' : '',
                            alignIcon === 'end' && 'flex-row-reverse',
                        )}
                    >
                        <CalendarIcon className={cn('h-4 w-4', alignIcon === 'start' && 'mr-2')} />
                        {value?.from ? (
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {format(value.from, 'do MMMM')} - {value.to ? format(value.to, 'do MMMM, yyyy') : ''}
                            </span>
                        ) : (
                            <span>{placeholder ? placeholder : 'Select Date'}</span>
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[92svh] w-auto overflow-y-auto p-0 pb-4 sm:pb-0">
                    <div className="flex items-center justify-between border-b px-4 py-2">
                        <DialogTitle className="text-base">Pick date range</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="-mr-3 rounded-full">
                                <XIcon className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>
                    <div className="flex">
                        {/* Presets */}
                        <div className="flex flex-col">
                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                                className="rounded-lg border-0 p-2 shadow-none"
                            />

                            <div className="flex justify-end gap-2 px-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setDateRange(value);
                                        setOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    size="sm"
                                    onClick={() => {
                                        onChange(dateRange);
                                        setOpen(false);
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen} modal={isMobile}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'flex h-9 w-full justify-start font-normal',
                        !value?.from && !value?.to ? 'text-muted-foreground' : '',
                        alignIcon === 'end' && 'flex-row-reverse',
                    )}
                >
                    <CalendarIcon className={cn('h-4 w-4', alignIcon === 'start' && 'mr-2')} />
                    {value?.from ? (
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {format(value.from, 'do MMM')} - {value.to ? format(value.to, 'do MMM, yyyy') : ''}
                        </span>
                    ) : (
                        <span>{placeholder ? placeholder : 'Select Date'}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-sm p-0 pb-4 sm:pb-0" align="start">
                <div className="flex w-full">
                    {/* Presets */}

                    {/* Calendar + Footer */}
                    <div className="flex w-full flex-col">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            month={currentMonth}
                            onMonthChange={setCurrentMonth}
                            className="w-full rounded-lg border-0 p-2 shadow-none"
                        />

                        <div className="my-3 flex justify-end gap-2 px-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setDateRange(value);
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                size="sm"
                                onClick={() => {
                                    onChange(dateRange);
                                    setOpen(false);
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
