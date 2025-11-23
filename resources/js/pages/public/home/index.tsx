import ConsultationForm from '@/components/consultation-form';
import StudentReviews from '@/components/student-review';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { LandingPageFAQ } from '@/pages/public/home/faq';
import FeaturedUniversities from '@/pages/public/home/featured-universities';
import HeroSection from '@/pages/public/home/hero-section';
import { JourneyRoadmap } from '@/pages/public/home/journey-roadmap';
import LatestBlogs from '@/pages/public/home/latest-blogs';
import PopularFaculties from '@/pages/public/home/popular-faculties';
import StatCards from '@/pages/public/home/stat-cards';
import { Blog } from '@/types/blog';
import { University } from '@/types/university';
import { Head, Link } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    universities: University[];
    blogs: Blog[];
    news: Blog[];
};

export default function PublicHome({ universities, blogs, news }: Props) {
    const [changeBackground, setChangeBackground] = useState(false);

    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
                <FeaturedUniversities universities={universities} className="py-12 sm:pt-10 sm:pb-20" />

                <Wrapper className="bg-gradient-to-b to-gray-800 pt-6 pb-20 text-gray-100 shadow-xl sm:py-20">
                    <StatCards />
                </Wrapper>
            </div>

            <PopularFaculties />

            <Wrapper className="flex flex-col items-center justify-center py-12 sm:pt-20">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <h1 className="text-center text-3xl font-extrabold tracking-tight capitalize drop-shadow-sm sm:text-4xl">
                        <span className="text-theme-accent/90">Journey</span> <span className="text-theme-secondary/80">Roadmap</span>
                    </h1>

                    <p className="max-w-3xl text-center text-theme-foreground sm:text-xl">
                        Your step-by-step guide to studying abroad with Earth Dreams Edu. From application to arrival, we&apos;ve got you covered.
                    </p>
                </div>

                <JourneyRoadmap />

                <Link href={route('public.study.index')}>
                    <Button variant="secondary" className="mt-8 h-12 min-w-80 rounded-3xl text-lg font-semibold shadow-lg hover:shadow-xl">
                        Learn More About Study In UK <ExternalLinkIcon className="ml-1 size-5" />
                    </Button>
                </Link>
            </Wrapper>

            <Wrapper>
                <Separator className="px-8" />
            </Wrapper>

            <Wrapper className="py-12">
                <LatestBlogs blogs={blogs} news={news} />
            </Wrapper>

            <Wrapper>
                <Separator className="px-8" />
            </Wrapper>

            <Wrapper className="py-12">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <h1 className="text-center text-3xl font-extrabold tracking-tight capitalize drop-shadow-sm sm:text-4xl">
                        Book Your <span className="text-theme-accent/90">Free</span> <span className="text-theme-secondary/90">Consultation</span>{' '}
                        Today
                    </h1>

                    <p className="max-w-3xl text-center text-theme-foreground sm:text-xl">
                        Get personalized guidance from our expert consultants. Whether you&apos;re exploring study options or need help with
                        applications, we&apos;re here to assist you every step of the way.
                    </p>
                </div>

                <ConsultationForm />
            </Wrapper>

            <Wrapper>
                <Separator className="px-8" />
            </Wrapper>

            <Wrapper className="py-12">
                <LandingPageFAQ />
            </Wrapper>

            <Wrapper>
                <Separator className="px-8" />
            </Wrapper>

            <Wrapper className="py-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
}
