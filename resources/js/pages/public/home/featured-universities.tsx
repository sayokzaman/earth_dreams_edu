import Wrapper from '@/components/wrapper';
import { cn } from '@/lib/utils';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';

function FeaturedUniversities({ className, universities }: { className?: string; universities: University[] }) {
    // initialise Embla
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    // simple autoplay: scrolls every 2.5 s
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            if (emblaApi.canScrollNext()) emblaApi.scrollNext();
            else emblaApi.scrollTo(0); // rewind if at the end
        }, 2500);
        return () => clearInterval(interval);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // chunk into groups of 6 so each “page” shows 6 universities
    const pages = Array.from({ length: Math.ceil(universities.length / 4) }, (_, i) => universities.slice(i * 4, i * 4 + 4));

    return (
        <Wrapper className={cn('flex flex-col gap-4', className)}>
            <span className="text-center text-2xl font-medium text-gray-400">Featured Universities</span>

            <div className="relative">
                {/* Embla viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {pages.map((group, i) => (
                            <div key={i} className="w-full flex-none p-2">
                                <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-4">
                                    {group.map((uni) => (
                                        <UniversityCard key={uni.name} uni={uni} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* arrows */}
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        onClick={scrollPrev}
                        className="top-1/2 -left-14 cursor-pointer rounded-full bg-black/40 p-2 text-gray-100 transition-all duration-300 hover:bg-gray-100 hover:text-gray-950 sm:absolute sm:-translate-y-1/2"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="top-1/2 -right-14 cursor-pointer rounded-full bg-black/40 p-2 text-gray-100 transition-all duration-300 hover:bg-gray-100 hover:text-gray-950 sm:absolute sm:-translate-y-1/2"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
}

export default FeaturedUniversities;

function UniversityCard({ uni }: { uni: University }) {
    return (
        <Link
            key={uni.name}
            href={route('public.universities.show', uni.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-44 w-full overflow-hidden rounded-2xl shadow-lg transition hover:scale-[1.02]"
        >
            {/* Background Image */}
            <img src={`/storage/${uni?.cover}`} alt={uni.name} className="absolute inset-0 h-full w-full object-cover" />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />

            {/* Content */}
            <div className="relative flex h-full w-full flex-col p-4 text-white items-center gap-2 justify-end">
                {/* Logo bubble */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md backdrop-blur-md bg-white/10 border border-white/20">
                    <img src={`/storage/${uni?.logo}`} alt={uni.name} className="h-full w-full object-cover" />
                </div>

                {/* Title */}
                <div className="w-full">
                    <p className="line-clamp-1 text-lg font-bold drop-shadow-md">{uni.name}</p>
                    <p className="mt-1 line-clamp-1 w-fit rounded-xl bg-white/20 px-3 py-1 text-xs text-gray-200/90 backdrop-blur-md">
                        <MapPinIcon className="mr-1 inline h-4 w-4" /> {uni.location}
                    </p>
                </div>
            </div>
        </Link>
    );
}
