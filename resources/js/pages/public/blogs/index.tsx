import StudentReviews from '@/components/student-review';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import BlogCard from '@/pages/public/blogs/card';
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';
import { TableData } from '@/types/table';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronLeft, ChevronRight, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    blogs: TableData<Blog>;
    categories: Category[];
    filters: {
        date: Date | undefined;
        searchBlog: string;
        types: string[];
        categories: number[];
    };
};

const initialFilters: Props['filters'] = {
    date: undefined,
    searchBlog: '',
    types: [],
    categories: [],
};

const types = ['blog', 'news', 'event'];

const BlogIndex = ({ blogs, categories, filters: incomingFilters }: Props) => {
    const [filters, setFilters] = useState(incomingFilters);

    const hasActiveFilters = Object.entries(filters).some(([, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== '' && value !== null && value !== undefined;
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

        // if date is set, convert to ISO string
        const payload = {
            ...Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => {
                    void _;
                    if (Array.isArray(v)) return v.length > 0;
                    return v !== '' && v !== null && v !== undefined;
                }),
            ),
            date: filters.date ? format(filters.date, 'yyyy-MM-dd') : undefined,
        };

        const timeout = setTimeout(() => {
            router.get(route('public.blogs.index'), payload, {
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
            <Head title="Blogs" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/blogs.jpg`}
                    alt={'student essentials uk'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-[28rem]">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            {/* some copy about Blogs */}
                            Our <span className="text-theme-accent">Blogs</span> in the <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Explore a variety of topics and insights through our blogs. Stay updated with the latest trends and information.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper id="main" className="relative flex flex-col pt-6 sm:px-10 lg:flex-row">
                <div className="top-24 w-full self-start py-4 lg:sticky lg:w-3/12 lg:pr-6">
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

                    <div className="grid gap-2">
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="type">
                                <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Blog Type</AccordionTrigger>
                                <AccordionContent className="mb-2 flex max-h-72 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                    {types.map((type) => (
                                        <div key={type} className="flex items-center">
                                            <input
                                                id={type}
                                                type="checkbox"
                                                className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                                checked={filters.types && filters.types.includes(type)}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        types: e.target.checked
                                                            ? [...(prev.types || []), type]
                                                            : prev.types.filter((t) => t !== type),
                                                    }))
                                                }
                                            />
                                            <label htmlFor={type} className="ml-2 cursor-pointer text-sm font-medium capitalize select-none">
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="category">
                                <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Category</AccordionTrigger>
                                <AccordionContent className="mb-2 flex max-h-60 flex-col gap-4 overflow-y-auto rounded-2xl border border-b-0 bg-white/70 p-4 shadow-xs">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                            checked={filters.categories && filters.categories.length === 0}
                                            onChange={() =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    categories: [],
                                                }))
                                            }
                                        />
                                        <label htmlFor="all" className="ml-2 cursor-pointer text-sm font-medium capitalize select-none">
                                            All
                                        </label>
                                    </div>

                                    {categories.map((category) => (
                                        <div key={category.id} className="flex items-center">
                                            <input
                                                id={category.name}
                                                type="checkbox"
                                                className="aspect-square h-4 w-4 rounded border-muted focus:ring-theme"
                                                checked={filters.categories && filters.categories.includes(category.id)}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        categories: e.target.checked
                                                            ? [...(prev.categories || []), category.id]
                                                            : prev.categories.filter((c) => c !== category.id),
                                                    }))
                                                }
                                            />
                                            <label htmlFor={category.name} className="ml-2 cursor-pointer text-sm font-medium capitalize select-none">
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="date">
                                <AccordionTrigger className="cursor-pointer font-semibold hover:no-underline">Date</AccordionTrigger>
                                <AccordionContent>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" id="date" className="w-full justify-between font-normal text-muted-foreground">
                                                {filters.date ? filters.date.toLocaleDateString() : 'Select published date'}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto min-w-64 overflow-hidden p-0" align="center">
                                            <Calendar
                                                mode="single"
                                                selected={filters.date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        date: date || undefined,
                                                    }));
                                                }}
                                                className="w-full"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="w-full py-6 lg:border-l lg:pl-6">
                    <div className="text-xl font-semibold">
                        <div className="mb-2 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                        <div className="flex gap-1.5">
                            <h1 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-2xl font-bold text-transparent">
                                List of Blogs
                            </h1>
                            <span className="font-medium text-muted-foreground/70">({blogs.total})</span>
                        </div>
                    </div>

                    <div className="my-4 flex w-full gap-2">
                        <Input
                            value={filters.searchBlog}
                            onChange={(e) => setFilters((prev) => ({ ...prev, searchBlog: e.target.value }))}
                            placeholder="Search Blogs"
                            className="w-full rounded-2xl bg-white"
                        />

                        <Button type="button" variant="secondary" className="h-9 rounded-2xl">
                            <SearchIcon className="h-4 w-4" />
                            Search
                        </Button>
                    </div>

                    {blogs.data.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-center text-muted-foreground">No blogs match your search.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                                {blogs.data.map((blog) => (
                                    <Link
                                        href={route('public.blogs.show', blog.id)}
                                        key={blog.id}
                                        className="transition-transform duration-500 hover:scale-102"
                                    >
                                        <BlogCard blog={blog} />
                                    </Link>
                                ))}
                            </div>

                            {blogs.links && (
                                <Pagination className="mt-6">
                                    <PaginationContent>
                                        {blogs.links.map((link, i: number) => {
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
                                                link.page === blogs.current_page + 1 ||
                                                link.page === blogs.current_page - 1
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

                                            if (blogs.links.length > 3 && link.page === blogs.links[1].page! + 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (blogs.links.length > 3 && link.page === blogs.last_page - 1) {
                                                return (
                                                    <PaginationItem>
                                                        <div className="pointer-events-none px-3 text-sm text-muted-foreground select-none">...</div>
                                                    </PaginationItem>
                                                );
                                            }

                                            if (link.page === blogs.last_page) {
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

export default BlogIndex;
