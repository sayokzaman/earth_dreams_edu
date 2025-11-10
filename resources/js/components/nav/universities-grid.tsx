import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import { ListIcon, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function UniversitiesGrid() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [query, setQuery] = useState('');

    // fetch once
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axios.get(route('public.universities.list'), { params: { query } });
                if (mounted) setUniversities(res.data ?? []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query]);

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

    // chunk logos 3 per slide
    const slides = useMemo(() => {
        const arr: University[][] = [];
        for (let i = 0; i < universities.length; i += 4) arr.push(universities.slice(i, i + 4));
        return arr;
    }, [universities]);

    return (
        <div className="w-[72vw]">
            {/* Search + quick links */}
            <div className="flex flex-col gap-2">
                <div className="relative mx-4 mt-4">
                    <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search university…"
                        className="w-full rounded-3xl border bg-white/70 px-9 py-2 text-sm ring-0 transition outline-none focus:border-theme focus:bg-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-1 px-4 py-2">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-6 rounded-lg px-4 py-2 transition-transform duration-200 ease-in-out hover:bg-white"
                        >
                            <img src={item.img} alt="" className="h-16 w-16" />
                            <div>
                                <div className="mb-1 h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-lg font-bold text-transparent">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full text-center font-semibold border-b pb-2 mb-2 text-muted-foreground">{query ? 'Search Results' : 'Featured Universities'}</div>
            {/* Featured carousel (optional) */}
            {universities.length > 0 && query === '' ? (
                <div>
                    <div className="relative flex flex-col items-center gap-4 px-4 pb-4">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {slides.map((group, i) => (
                                    <div key={i} className="w-full flex-none p-2">
                                        <div
                                            className={cn(
                                                'grid justify-center gap-4',
                                                universities.length <= 4 ? `grid-cols-${universities.length}` : 'grid-cols-4',
                                            )}
                                        >
                                            {group.map((uni) => (
                                                <Link
                                                    key={uni.name}
                                                    href={route('public.universities.show', uni.name)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl bg-white shadow transition hover:scale-105 sm:h-28"
                                                >
                                                    <img src={uni.logo} alt={uni.name} className="h-full max-h-16 object-contain" />
                                                    <p className="line-clamp-2 px-4 text-center text-xs font-bold text-theme-foreground">
                                                        {uni.name}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button variant={'secondary'} className="rounded-3xl">
                            <ListIcon className="h-5 w-5" />
                            Show List of All Universities
                        </Button>
                    </div>
                </div>
            ) : universities.length > 0 && query !== '' ? (
                <div className="flex flex-col items-center gap-4 px-4 pb-4">
                    <div className="flex">
                        {slides.map((group, i) => (
                            <div key={i} className="w-full flex-none p-2">
                                <div
                                    className={cn(
                                        'grid justify-center gap-4',
                                        universities.length <= 4 ? `grid-cols-${universities.length}` : 'grid-cols-4',
                                    )}
                                >
                                    {group.map((uni) => (
                                        <Link
                                            key={uni.name}
                                            href={route('public.universities.show', uni.name)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-24 items-center justify-center rounded-xl bg-white p-6 shadow transition hover:scale-105 sm:h-28"
                                        >
                                            <img src={uni.logo} alt={uni.name} className="h-full max-h-16 object-contain" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant={'secondary'} className="rounded-3xl">
                        <ListIcon className="h-5 w-5" />
                        Load More Results
                    </Button>
                </div>
            ) : (
                <div className="flex w-full flex-col gap-4 pt-8 pb-4 text-center text-sm text-muted-foreground">
                    <p>No match your search.</p>
                    <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                        <ListIcon className="h-5 w-5" />
                        Explore All Universities
                    </Button>
                </div>
            )}
        </div>
    );
}
