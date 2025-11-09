import { Slider } from '@/components/ui/slider';
import * as React from 'react';

type Filters = {
    searchCourse: string;
    searchFaculty: string;
    faculties: string[];
    studyLevels: string[];
    durationRange?: [number, number]; // months
};

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export function DurationRangeFilter({ filters, setFilters }: Props) {
    // default to full range if nothing selected yet
    const value: [number, number] = filters.durationRange ?? [1, 72];

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    {formatMonths(value[0])} — {formatMonths(value[1])}
                </span>
            </div>

            <Slider
                min={1}
                max={72}
                step={1}
                value={value}
                onValueChange={(v) => {
                    // Radix gives number[]; ensure tuple
                    const next: [number, number] = [v[0], v[1]];
                    setFilters((prev) => ({ ...prev, durationRange: next }));
                }}
                // optional: force at least 1 month gap between thumbs
                minStepsBetweenThumbs={1}
                className="w-full"
            />

            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                {['1m', '6m', '1y', '2y', '3y', '4y', '5y', '6y'].map((k) => (
                    <span key={k}>{k}</span>
                ))}
            </div>
        </div>
    );
}

function formatMonths(m: number) {
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${m} mo`;
    if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`;
    return `${y} yr${y > 1 ? 's' : ''} ${mo} mo`;
}
