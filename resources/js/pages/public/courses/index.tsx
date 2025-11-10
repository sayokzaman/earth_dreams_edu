import StudentReviews from '@/components/student-review';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import CourseCard from '@/pages/public/courses/card';
import { DurationRangeFilter } from '@/pages/public/courses/duration-range';
import { Course } from '@/types/course';
import { TableData } from '@/types/table';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    courses: TableData<Course>;
    faculties: string[];
    filters: {
        searchCourse: string;
        searchFaculty: string;
        faculties: string[];
        studyLevels: string[];
        durationRange?: [number, number];
    };
};

const DEFAULT_RANGE: [number, number] = [1, 72];

const initialFilters = {
    searchCourse: '',
    searchFaculty: '',
    faculties: [],
    studyLevels: [],
    durationRange: DEFAULT_RANGE,
};

const studyLevels = ['undergraduate', 'masters', 'foundation', 'top_up', 'phd', 'doctorate'];

const CourseIndex = ({ courses, faculties, filters: incomingFilters }: Props) => {
    const [filters, setFilters] = useState(incomingFilters);

    const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
        if (key === 'durationRange') {
            const r = value as [number, number] | undefined;
            return r ? r[0] !== DEFAULT_RANGE[0] || r[1] !== DEFAULT_RANGE[1] : false;
        }
        if (Array.isArray(value)) return value.length > 0;
        return value !== '';
    });

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
            router.get(route('public.courses.index'), payload, {
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
            <Head title="Courses" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/courses.jpg`}
                    alt={'student essentials uk'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-[28rem]">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            {/* some copy about Courses */}
                            Top <span className="text-theme-accent">Courses</span> in the <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Study globally recognized programs in business, engineering, arts, and health. Build skills that stand out anywhere in the
                            world.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper id="main" className="relative flex flex-col pt-6 sm:px-10 lg:flex-row">
                <div className="top-24 w-full self-start py-4 lg:sticky lg:w-3/12 lg:pr-6">
                    <div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <div className="w-full">
                                <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                <div className="flex gap-1.5">
                                    <h1 className="w-full bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-lg font-bold text-transparent">
                                        Filter by
                                    </h1>
                                </div>
                            </div>
                            {hasActiveFilters && (
                                <Button onClick={clearFilters} className="h-6 gap-1 rounded-full text-sm">
                                    <XIcon className="h-3.5 w-3.5" />
                                    Clear Filters
                                </Button>
                            )}
                        </div>

                        {filters.faculties.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2 border-b pb-2">
                                <p className="text-xs font-semibold text-muted-foreground">Selected Faculties</p>
                                {filters.faculties.map((name) => (
                                    <Badge variant="accent" key={name}>
                                        {name}
                                        <button
                                            type="button"
                                            className="ml-1 flex size-4 cursor-pointer items-center justify-center rounded-full capitalize hover:bg-white hover:text-black"
                                            onClick={() =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    faculties: prev.faculties.filter((faculty) => faculty !== name),
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
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="faculties">
                            <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Faculties</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-72 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                <Input
                                    type="search"
                                    placeholder="Search faculties"
                                    value={filters.searchFaculty}
                                    onChange={(e) => setFilters({ ...filters, searchFaculty: e.target.value })}
                                    className="h-7"
                                />
                                {faculties.map((name) => (
                                    <div key={name} className="flex items-center">
                                        <input
                                            id={name}
                                            type="checkbox"
                                            className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                            checked={filters.faculties.some((faculty) => faculty === name)}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    faculties: e.target.checked
                                                        ? [...prev.faculties, name]
                                                        : prev.faculties.filter((faculty) => faculty !== name),
                                                }))
                                            }
                                        />
                                        <label htmlFor={name} className="ml-2 cursor-pointer text-sm capitalize select-none">
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="study_level">
                            <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Study Level</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-60 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                {studyLevels.map((name) => (
                                    <div key={name} className="flex items-center">
                                        <input
                                            id={name}
                                            type="checkbox"
                                            className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                            checked={filters.studyLevels.some((level) => level === name)}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    studyLevels: e.target.checked
                                                        ? [...prev.studyLevels, name]
                                                        : prev.studyLevels.filter((level) => level !== name),
                                                }))
                                            }
                                        />
                                        <label htmlFor={name} className="ml-2 cursor-pointer text-sm capitalize select-none">
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="duration">
                            <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Duration</AccordionTrigger>
                            <AccordionContent className="mb-2 flex max-h-60 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                <DurationRangeFilter filters={filters} setFilters={setFilters} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="w-full py-6 lg:border-l lg:pl-6">
                    <div className="text-xl font-semibold">
                        <div className="mb-2 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                        <div className="flex gap-1.5">
                            <h1 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-2xl font-bold text-transparent">
                                List of Courses
                            </h1>
                            <span className="font-medium text-muted-foreground/70">({courses.total})</span>
                        </div>
                    </div>

                    <div className="my-4 flex w-full gap-2">
                        <Input
                            value={filters.searchCourse}
                            onChange={(e) => setFilters((prev) => ({ ...prev, searchCourse: e.target.value }))}
                            placeholder="Search Courses"
                            className="w-full rounded-2xl bg-white"
                        />

                        <Button type="button" variant="secondary" className="h-9 rounded-2xl">
                            <SearchIcon className="h-4 w-4" />
                            Search
                        </Button>
                    </div>

                    {courses.data.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                            No universities match your search.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6">
                                {courses.data.map((course) => (
                                    <Link
                                        href={route('public.courses.show', course.title)}
                                        key={course.id}
                                        className="transition-transform duration-500 hover:scale-102"
                                    >
                                        <CourseCard course={course} className="h-full" />
                                    </Link>
                                ))}
                            </div>

                            {courses.links && (
                                <Pagination className="mt-6">
                                    <PaginationContent>
                                        {courses.links.map((link, i: number) => {
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
                                                link.page === courses.current_page + 1 ||
                                                link.page === courses.current_page - 1
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

                                            if (courses.links.length > 3 && link.page === courses.links[1].page! + 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (courses.links.length > 3 && link.page === courses.last_page - 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (link.page === courses.last_page) {
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

            <Wrapper className="pt-16 pb-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
};

export default CourseIndex;
