import Wrapper from '@/components/wrapper';
import { cn } from '@/lib/utils';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
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
    const pages = Array.from({ length: Math.ceil(universities.length / 6) }, (_, i) => universities.slice(i * 6, i * 6 + 6));

    return (
        <Wrapper className={cn('flex flex-col gap-4', className)}>
            <span className="text-center text-2xl font-medium text-gray-400">Featured Universities</span>

            <div className="relative">
                {/* Embla viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {pages.map((group, i) => (
                            <div key={i} className="w-full flex-none p-2">
                                <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-6">
                                    {group.map((uni) => (
                                        <Link
                                            key={uni.name}
                                            href={route('public.universities.show', uni.name)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-24 items-center justify-center rounded-xl bg-white p-8 shadow transition hover:scale-105 sm:h-32"
                                        >
                                            <img src={uni.logo} alt={uni.name} className="h-full max-h-20 object-contain" />
                                        </Link>
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
