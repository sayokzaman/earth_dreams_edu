import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import UniversityCard from '@/pages/public/universities/card';
import { TableData } from '@/types/table';
import { University } from '@/types/university';
import { Head, Link, router } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    universities: TableData<University>;
    universityNames: string[];
    filters: {
        searchUniversity: string;
        universities: string[];
        searchLocation: string;
        ranking: Ranking;
    };
};

type Ranking = 'guardian_ranking' | 'world_ranking' | 'qs_ranking' | '';

const initialFilters = {
    searchUniversity: '',
    universities: [],
    searchLocation: '',
    ranking: '' as Ranking,
};

const UniversityIndex = ({ universities, universityNames, filters: incomingFilters }: Props) => {
    const [filters, setFilters] = useState(incomingFilters);

    const clearFilters = () => {
        setFilters(initialFilters);
    };

    const hasMounted = useRef(true);

    useEffect(() => {
        if (hasMounted.current) {
            hasMounted.current = false;
            return;
        }

        // ✅ only include non-empty values so the URL stays clean
        const payload = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => {
                void _;
                if (Array.isArray(v)) return v.length > 0;
                return v !== '' && v !== null && v !== undefined;
            }),
        );

        const timeout = setTimeout(() => {
            router.get(route('public.universities.index'), payload, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    const navOpts = { preserveState: true, preserveScroll: true, replace: true };

    return (
        <AppPublicLayout>
            <Head title="Universities" />

            <Wrapper className="relative flex flex-col lg:flex-row sm:px-10">
                <div className="flex w-full flex-col self-start py-6 sm:sticky lg:w-sm sm:pr-6">
                    <div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <span>Filters</span>
                            <Button onClick={clearFilters} className="h-8 rounded-full bg-theme px-3 text-sm hover:bg-theme/90">
                                Reset
                            </Button>
                        </div>

                        {filters.universities.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                <p className="text-xs font-semibold text-muted-foreground">Selected Universities</p>
                                {filters.universities.map((name) => (
                                    <Badge key={name}>
                                        {name}
                                        <button
                                            type="button"
                                            className="ml-1 flex size-4 cursor-pointer items-center justify-center rounded-full hover:bg-white hover:text-black"
                                            onClick={() =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    universities: prev.universities.filter((university) => university !== name),
                                                }))
                                            }
                                        >
                                            <XIcon className="h-3.5 w-3.5" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="universities">
                            <AccordionTrigger className="cursor-pointer hover:no-underline">Universities</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-72 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                <div>
                                    <Input
                                        value={filters.searchUniversity}
                                        onChange={(e) => setFilters((prev) => ({ ...prev, searchUniversity: e.target.value }))}
                                        placeholder="Search Universities"
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                                {universityNames.map((name) => (
                                    <div key={name} className="flex items-center">
                                        <input
                                            id={name}
                                            type="checkbox"
                                            className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                            checked={filters.universities.some((university) => university === name)}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    universities: e.target.checked
                                                        ? [...prev.universities, name]
                                                        : prev.universities.filter((university) => university !== name),
                                                }))
                                            }
                                        />
                                        <label htmlFor={name} className="ml-2 cursor-pointer text-sm select-none">
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="location">
                            <AccordionTrigger className="cursor-pointer hover:no-underline">Location</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-60 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                <Input
                                    value={filters.searchLocation}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, searchLocation: e.target.value }))}
                                    placeholder="Search Locations"
                                    className="w-full rounded-2xl"
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="Ranking">
                            <AccordionTrigger className="cursor-pointer hover:no-underline">Ranking</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-60 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                <p className="text-xs font-semibold">Top Rated By</p>
                                <RadioGroup
                                    value={filters.ranking}
                                    onValueChange={(value) => setFilters((prev) => ({ ...prev, ranking: value as Ranking }))}
                                    className="flex flex-col gap-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="guardian_ranking"
                                            id="guardian_ranking"
                                            className="size-5 border-2 border-gray-400 data-[state=checked]:border-theme/70 data-[state=checked]:text-theme/70"
                                        />
                                        <Label htmlFor="guardian_ranking">Guardian Ranking</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="world_ranking"
                                            id="world_ranking"
                                            className="size-5 border-2 border-gray-400 data-[state=checked]:border-theme/70 data-[state=checked]:text-theme/70"
                                        />
                                        <Label htmlFor="world_ranking">THE World Ranking</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="qs_ranking"
                                            id="qs_ranking"
                                            className="size-5 border-2 border-gray-400 data-[state=checked]:border-theme/70 data-[state=checked]:text-theme/70"
                                        />
                                        <Label htmlFor="qs_ranking">QS Ranking</Label>
                                    </div>
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="w-full py-6 lg:border-l lg:pl-6">
                    <h1 className="mb-4 text-xl font-semibold">
                        List of Universities <span className="font-medium text-muted-foreground/70">({universities.total})</span>
                    </h1>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                        {universities.data.map((university) => (
                            <Link
                                href={route('public.universities.show', university.name)}
                                key={university.id}
                                className="transition-transform duration-500 hover:scale-102"
                            >
                                <UniversityCard university={university} />
                            </Link>
                        ))}
                    </div>

                    {universities.links && (
                        <Pagination className="mt-6">
                            <PaginationContent>
                                {universities.links.map((link, i: number) => {
                                    const label = String(link.label);
                                    const isPrev = /Previous/i.test(label);
                                    const isNext = /Next/i.test(label);
                                    const isDots = label === '...';

                                    if (isDots) {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }

                                    if (isPrev) {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationPrevious
                                                    size={'sm'}
                                                    className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                                    onClick={() => link.url && router.get(link.url, {}, navOpts)}
                                                />
                                            </PaginationItem>
                                        );
                                    }

                                    if (isNext) {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationNext
                                                    size={'sm'}
                                                    className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                                    onClick={() => link.url && router.get(link.url, {}, navOpts)}
                                                />
                                            </PaginationItem>
                                        );
                                    }

                                    // Numbered page
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                className={cn(
                                                    'rounded-full',
                                                    link.active
                                                        ? 'bg-theme-accent text-white hover:bg-theme-accent/90 hover:text-white'
                                                        : 'hover:bg-muted-foreground/10',
                                                )}
                                                size={'sm'}
                                                isActive={link.active}
                                                onClick={() => link.url && router.get(link.url, {}, navOpts)}
                                            >
                                                {label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </Wrapper>
        </AppPublicLayout>
    );
};

export default UniversityIndex;
