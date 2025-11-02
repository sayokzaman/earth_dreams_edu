import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import UniversityCard from '@/pages/public/universities/card';
import { TableData } from '@/types/table';
import { University } from '@/types/university';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react';
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

    const paginate = async (url: string | null) => {
        if (!url) return;
        router.get(
            url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
        window.scrollTo(
            // top of the universities list
            {
                top: document.getElementById('main')!.offsetTop - 80, // account for fixed header height
                // smooth scrolling isn't working
                behavior: 'smooth',
            },
        );
    };

    return (
        <AppPublicLayout>
            <Head title="Universities" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'universities'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-4 pt-28 sm:gap-6 sm:pt-40">
                        <h1 className="text-3xl font-bold text-secondary capitalize sm:text-4xl">
                            <span className="text-theme-accent">Explore</span> Our Top <span className="text-theme-secondary">Universities</span>
                        </h1>
                        <p className="max-w-2xl text-center text-muted/80 sm:text-xl">
                            Discover a world of opportunities with our curated list of top universities. Find the perfect fit for your academic
                            journey and career aspirations.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper id="main" className="relative flex flex-col pt-6 sm:px-10 lg:flex-row">
                <div className="top-24 w-full self-start py-4 lg:sticky lg:w-3/12 lg:pr-6">
                    <div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="font-semibold">Filter by</span>
                            {Object.values(filters).some((value) => (Array.isArray(value) ? value.length > 0 : value !== '')) && (
                                <Button onClick={clearFilters} className="h-6 gap-1 rounded-full bg-black text-sm hover:bg-black/80">
                                    <XIcon className="h-3.5 w-3.5" />
                                    Clear Filters
                                </Button>
                            )}
                        </div>

                        {filters.universities.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2 border-b pb-2">
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
                    {universities.data.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                            No universities match your search.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                                {universities.data.map((university) => (
                                    <Link
                                        href={route('public.universities.show', university.name)}
                                        key={university.id}
                                        className="transition-transform duration-500 hover:scale-102"
                                    >
                                        <UniversityCard university={university} className="h-full" />
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

                                            if (isPrev || isNext) {
                                                return (
                                                    <PaginationItem
                                                        key={i}
                                                        className={!link.url ? 'pointer-events-none' : ''}
                                                        onClick={() => paginate(link.url)}
                                                    >
                                                        <Button
                                                            variant={'ghost'}
                                                            size={'icon'}
                                                            disabled={!link.url}
                                                            className="rounded-full hover:bg-muted-foreground/10"
                                                        >
                                                            {isPrev ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                        </Button>
                                                    </PaginationItem>
                                                );
                                            }

                                            // Numbered page
                                            if (
                                                link.active ||
                                                link.page === 1 ||
                                                link.page === universities.current_page + 1 ||
                                                link.page === universities.current_page - 1
                                            ) {
                                                return (
                                                    <PaginationItem key={i}>
                                                        <PaginationLink
                                                            className={cn(
                                                                'rounded-full',
                                                                link.active
                                                                    ? 'bg-theme-accent text-white hover:bg-theme-accent/90 hover:text-white'
                                                                    : 'hover:bg-muted-foreground/10',
                                                            )}
                                                            size={'icon'}
                                                            isActive={link.active}
                                                            onClick={() => paginate(link.url!)}
                                                        >
                                                            {label}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (universities.links.length > 3 && link.page === universities.links[1].page! + 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (universities.links.length > 3 && link.page === universities.last_page - 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (link.page === universities.last_page) {
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
                                                            onClick={() => paginate(link.url!)}
                                                        >
                                                            {label}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            }
                                        })}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </>
                    )}
                </div>
            </Wrapper>
        </AppPublicLayout>
    );
};

export default UniversityIndex;
