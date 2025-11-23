import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import { SearchTabs } from '@/pages/public/home/search-tabs';
import { Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const HeroSection = ({ ref }: { ref?: React.RefObject<HTMLDivElement | null> }) => {
    const videos = useMemo(() => ['/hero_section_clips/graduation-0.mp4', '/hero_section_clips/graduation-1.mp4'], []);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle when one video ends
    const handleEnded = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    // Change video source when index updates
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.src = videos[currentIndex];
            video.load();
            video.play().catch(() => {
                console.log('Autoplay blocked, waiting for user interaction');
            });
        }
    }, [currentIndex, videos]);

    return (
        <div className="relative">
            <video
                ref={videoRef}
                src={videos[currentIndex]}
                autoPlay
                muted
                playsInline
                onEnded={handleEnded}
                className="absolute inset-0 h-full w-full bg-accent-foreground object-cover"
            />
            <Wrapper className="relative bg-gradient-to-b from-accent-foreground/10 from-40% to-accent-foreground/80">
                <div className="flex w-full flex-col gap-8 pt-40 pb-24 text-gray-100 sm:gap-6 sm:pt-68 sm:pb-14">
                    <div className="flex flex-col items-center">
                        <p
                            className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text pb-1 text-xl font-semibold text-transparent sm:text-3xl"
                            ref={ref}
                        >
                            Welcome
                        </p>
                        <div className="flex flex-col items-center">
                            <p className="leading-tighter h-full text-4xl font-extrabold tracking-widest sm:text-7xl">
                                <span className="text-theme-accent">EARTH</span> <span className="text-theme-secondary">DREAMS</span>
                            </p>
                            <span className="text-xl leading-tight font-extrabold sm:text-3xl">Education & Consultancy</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/consultation" className="w-full">
                                <Button className="sm:text-md w-full rounded-3xl font-bold sm:h-12 sm:text-base">Apply Now</Button>
                            </Link>
                            <Link href="/consultation">
                                <Button className="sm:text-md rounded-3xl font-bold sm:h-12 sm:text-base" variant="secondary">
                                    Free Consultancy
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <Wrapper className="relative bg-gradient-to-b from-accent-foreground/80 from-40% to-accent-foreground">
                <SearchTabs className="max-w-4xl" />
            </Wrapper>
        </div>
    );
};

export default HeroSection;
