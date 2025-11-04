import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import FeaturedUniversities from '@/pages/public/home/featured-universities';
import HeroSection from '@/pages/public/home/hero-section';
import StatCards from '@/pages/public/home/stat-cards';
import StudentReviews from '@/components/student-review';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function PublicHome() {
    const [changeBackground, setChangeBackground] = useState(false);

    const backgroundRef = useRef<HTMLDivElement>(null);
    // get prompt when ref is at the top of the viewport
    useEffect(() => {
        // just give me a console log for testing
        const handleScroll = () => {
            if (backgroundRef.current) {
                const rect = backgroundRef.current.getBoundingClientRect();
                if (rect.top <= 0) {
                    setChangeBackground(true);
                } else {
                    setChangeBackground(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppPublicLayout changeBackground={changeBackground}>
            <Head title="Earth Dreams Edu" />

            <HeroSection ref={backgroundRef} />

            <div className="z-10 -mt-px bg-accent-foreground">
                <FeaturedUniversities className="py-12 sm:pt-10 sm:pb-20" />

                <Wrapper className="bg-gradient-to-b to-gray-800 pt-6 pb-20 text-gray-100 shadow-xl sm:py-20">
                    <StatCards />
                </Wrapper>
            </div>

            <Wrapper className="pt-16 pb-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
}
