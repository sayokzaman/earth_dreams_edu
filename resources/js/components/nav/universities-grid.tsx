import { Button } from '@/components/ui/button';
import { useUniversities } from '@/contexts/UniversityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { University } from '@/types/university';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import { ListIcon, MapPinIcon, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function UniversitiesGrid() {
    const { featuredUniversities, loading: contextLoading, fetchUniversities } = useUniversities();
    const [searchResults, setSearchResults] = useState<University[]>([]);
    const [query, setQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    // Fetch featured universities on mount
    useEffect(() => {
        fetchUniversities();
    }, [fetchUniversities]);

    // Search universities when query changes
    useEffect(() => {
        if (query === '') {
            setSearchResults([]);
            return;
        }

        let mounted = true;
        setSearchLoading(true);
        (async () => {
            try {
                const res = await axios.get(route('public.universities.list'), { params: { query } });
                if (mounted) {
                    setSearchResults(res.data ?? []);
                    setSearchLoading(false);
                }
            } catch (e) {
                console.error(e);
                if (mounted) setSearchLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query]);

    const universities = query === '' ? featuredUniversities : searchResults;
    const loading = query === '' ? contextLoading : searchLoading;

    // match StudyInUKGrid look: two-column floating nav rows
    const quickLinks = [
        {
            img: '/images/universities/all-universities.svg',
            title: 'All Universities',
            href: route('public.universities.index'),
            description: 'Browse the full list by country, course, or rank.',
        },
        {
            img: '/images/universities/russell-group.svg',
            title: 'Russell Group Universities',
            href: route('public.universities.russellGroup'),
            description: 'Explore the prestigious Russell Group of UK universities.',
        },
        {
            img: '/images/universities/rankings.svg',
            title: 'Rankings',
            href: route('public.universities.rankings'),
            description: 'Discover the top universities in the UK based on their rankings.',
        },
        {
            img: '/images/universities/top-universities.svg',
            title: 'Top Universities in UK',
            href: route('public.universities.topUniversities'),
            description: 'Explore the leading universities in the UK known for their academic excellence.',
        },
    ];

    // Embla (featured)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            if (emblaApi.canScrollNext()) emblaApi.scrollNext();
            else emblaApi.scrollTo(0); // rewind if at the end
        }, 2500);
        return () => clearInterval(interval);
    }, [emblaApi]);

    const isMobile = useIsMobile();
    const slides = useMemo(() => {
        const arr: University[][] = [];
        const countPerSlide = isMobile ? 2 : 4;

        for (let i = 0; i < universities.length; i += countPerSlide) arr.push(universities.slice(i, i + countPerSlide));
        return arr;
    }, [universities, isMobile]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit(route('public.universities.index', { searchUniversity: query }));
    };

    return (
        <div className="w-[72vw]">
            <div className="flex flex-col gap-2">
                <form className="mx-4 mt-2 flex items-center gap-2 lg:mt-4" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search universities…"
                            className="w-full rounded-3xl border bg-white/70 px-9 py-2 text-sm ring-0 transition outline-none focus:border-theme focus:bg-white"
                        />
                    </div>
                    <Button type="submit" variant={'secondary'} className="h-9 rounded-3xl">
                        Search
                    </Button>
                </form>

                <div className="grid auto-rows-fr grid-cols-2 gap-3 px-4 py-2">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-sm lg:flex-row lg:justify-start lg:gap-4 lg:py-2 lg:shadow-xs"
                        >
                            <img src={item.img} alt="" className="size-10 lg:h-16 lg:w-16" />
                            <div>
                                <div className="mb-1 hidden h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary lg:block" />

                                <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-center text-sm lg:text-start lg:text-lg lg:font-semibold lg:text-transparent">
                                    {item.title}
                                </h2>

                                <p className="hidden text-sm text-gray-600 lg:block">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mb-2 w-full border-b pb-2 text-center font-semibold text-muted-foreground">
                {query ? 'Search Results' : 'Featured Universities'}
            </div>
            {loading ? (
                <div className="relative flex flex-col items-center gap-4 px-4 lg:pb-4">
                    <div className="w-full p-2">
                        <div className="grid grid-cols-2 justify-center gap-4 lg:grid-cols-4">
                            {Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => (
                                <UniversityCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : universities.length > 0 && query === '' ? (
                <div className="relative flex flex-col items-center gap-4 px-4 lg:pb-4">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {slides.map((group, i) => (
                                <div key={i} className="w-full flex-none p-2">
                                    <div
                                        className={cn(
                                            'grid justify-center gap-4',
                                            universities.length <= 4 ? `grid-cols-${universities.length}` : 'grid-cols-2 lg:grid-cols-4',
                                        )}
                                    >
                                        {group.map((uni) => (
                                            <UniversityCard key={uni.name} uni={uni} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            !loading &&{' '}
                        </div>
                    </div>

                    <Link href={route('public.universities.index')}>
                        <Button variant={'secondary'} className="rounded-3xl">
                            <ListIcon className="h-5 w-5" />
                            Show List of All Universities
                        </Button>
                    </Link>
                </div>
            ) : universities.length > 0 && query !== '' ? (
                <div className="flex flex-col items-center gap-4 px-4 lg:pb-4">
                    <div className="flex overflow-x-auto">
                        {slides.map((group, i) => (
                            <div key={i} className="w-full flex-none overflow-x-auto p-2">
                                <div
                                    className={cn(
                                        'grid justify-center gap-4 overflow-x-auto',
                                        universities.length <= 4 ? `grid-cols-${universities.length}` : 'grid-cols-2 lg:grid-cols-4',
                                    )}
                                >
                                    {group.map((uni) => (
                                        <UniversityCard key={uni.name} uni={uni} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href={route('public.universities.index', { searchUniversity: query })}>
                        <Button variant={'secondary'} className="rounded-3xl">
                            <ListIcon className="h-5 w-5" />
                            Load More Results
                        </Button>
                    </Link>
                </div>
            ) : !loading ? (
                <div className="flex w-full flex-col gap-6 pt-8 text-center text-sm text-muted-foreground lg:pb-4">
                    <p>No universities match your search.</p>
                    <Link href={route('public.universities.index')}>
                        <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                            <ListIcon className="h-5 w-5" />
                            Explore Other Universities
                        </Button>
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

function UniversityCardSkeleton() {
    return (
        <div className="relative flex h-48 w-full overflow-hidden rounded-2xl shadow-lg lg:h-56 2xl:h-44">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="relative flex h-full w-full flex-col justify-between p-4">
                {/* Logo placeholder */}
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />

                {/* Title placeholder */}
                <div className="space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-300" />
                </div>

                {/* Bottom details placeholder */}
                <div className="grid gap-2 2xl:grid-cols-3">
                    <div className="hidden h-12 animate-pulse rounded-xl bg-gray-300 lg:block" />
                    <div className="hidden h-12 animate-pulse rounded-xl bg-gray-300 2xl:block" />
                    <div className="h-12 animate-pulse rounded-xl bg-gray-300" />
                </div>
            </div>
        </div>
    );
}

function UniversityCard({ uni }: { uni: University }) {
    return (
        <Link
            key={uni.name}
            href={route('public.universities.show', uni.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-48 w-full overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 lg:h-56 2xl:h-44"
        >
            {/* Background Image */}
            <img src={`/storage/${uni?.cover}`} alt={uni.name} className="absolute inset-0 h-full w-full object-cover" />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

            {/* Content */}
            <div className="relative flex h-full w-full flex-col justify-between p-4 text-white">
                {/* Logo bubble */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/80 shadow-md backdrop-blur-md">
                    <img src={`/storage/${uni?.logo}`} alt={uni.name} className="h-full w-full object-cover" />
                </div>

                {/* Title */}
                <div>
                    <p className="line-clamp-3 text-sm font-bold drop-shadow-md lg:line-clamp-1 lg:text-lg">{uni.name}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-gray-200/90">
                        <MapPinIcon className="mr-1 inline h-4 w-4" /> {uni.location}
                    </p>
                </div>

                {/* Glass bottom details */}
                <div className="grid gap-2 2xl:grid-cols-3">
                    {/* Founded */}
                    <div className="hidden rounded-xl bg-white/20 px-3 py-2 backdrop-blur-md lg:block">
                        <p className="text-[10px] tracking-wider text-gray-100 uppercase">Founded</p>
                        <p className="text-xs font-semibold">{uni.founded}</p>
                    </div>

                    {/* QS Ranking */}
                    <div className="hidden rounded-xl bg-white/20 px-3 py-2 backdrop-blur-md 2xl:block">
                        <p className="text-[10px] tracking-wider text-gray-100 uppercase">QS Rank</p>
                        <p className="text-xs font-semibold">{uni.qs_ranking}</p>
                    </div>

                    {/* Scholarships */}
                    <div className="rounded-xl bg-white/20 px-3 py-2 backdrop-blur-md">
                        <p className="text-[10px] tracking-wider text-gray-100 uppercase">Scholarship</p>
                        <p className="text-xs font-semibold">{uni.scholarship}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
