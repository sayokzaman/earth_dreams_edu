import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';

type University = {
    name: string;
    logo: string;
    link: string;
};

const universities: University[] = [
    { name: 'Abertay University', logo: '/images/versity_logos/abertay.png', link: 'https://www.coventry.ac.uk/' },
    { name: 'Aberystwyth University', logo: '/images/versity_logos/aberystwyth.png', link: 'https://www.bucks.ac.uk/' },
    { name: 'Anglia Ruskin University College', logo: '/images/versity_logos/anglia-ruskin.png', link: 'https://www.aber.ac.uk/' },
    { name: 'Arts University Bournemouth', logo: '/images/versity_logos/aub.avif', link: 'https://www.dur.ac.uk/' },
    { name: 'Bangor University', logo: '/images/versity_logos/bangor.png', link: 'https://www.coventry.ac.uk/' },
    { name: 'Birmingham City University International College', logo: '/images/versity_logos/birmingham.png', link: 'https://www.bucks.ac.uk/' },
    { name: 'Bishop Grosseteste University', logo: '/images/versity_logos/bishop-groseteste.webp', link: 'https://www.aber.ac.uk/' },
    { name: 'BPP University', logo: '/images/versity_logos/bpp.jpeg', link: 'https://www.dur.ac.uk/' },
    { name: 'Abertay University', logo: '/images/versity_logos/abertay.png', link: 'https://www.coventry.ac.uk/' },
    { name: 'Aberystwyth University', logo: '/images/versity_logos/aberystwyth.png', link: 'https://www.bucks.ac.uk/' },
    { name: 'Anglia Ruskin University College', logo: '/images/versity_logos/anglia-ruskin.png', link: 'https://www.aber.ac.uk/' },
    { name: 'Arts University Bournemouth', logo: '/images/versity_logos/aub.avif', link: 'https://www.dur.ac.uk/' },
    { name: 'Bangor University', logo: '/images/versity_logos/bangor.png', link: 'https://www.coventry.ac.uk/' },
    { name: 'Birmingham City University International College', logo: '/images/versity_logos/birmingham.png', link: 'https://www.bucks.ac.uk/' },
    { name: 'Bishop Grosseteste University', logo: '/images/versity_logos/bishop-groseteste.webp', link: 'https://www.aber.ac.uk/' },
    { name: 'BPP University', logo: '/images/versity_logos/bpp.jpeg', link: 'https://www.dur.ac.uk/' },
    { name: 'Bishop Grosseteste University', logo: '/images/versity_logos/bishop-groseteste.webp', link: 'https://www.aber.ac.uk/' },
    { name: 'BPP University', logo: '/images/versity_logos/bpp.jpeg', link: 'https://www.dur.ac.uk/' },
    // …more
];

function FeaturedUniversities({ className }: { className?: string }) {
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
        <div className={cn('flex flex-col gap-4', className)}>
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
                                            href={uni.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-xl bg-white p-8 shadow transition hover:scale-105"
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
                <div className='flex justify-center gap-4 pt-4'>
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
        </div>
    );
}

export default FeaturedUniversities;
