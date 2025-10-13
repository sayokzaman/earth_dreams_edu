import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import FeaturedUniversities from '@/pages/public/home/featured-universities';
import HeroSection from '@/pages/public/home/hero-section';
import StatCards from '@/pages/public/home/stat-cards';
import StudentReviews from '@/pages/public/home/student-review';
import { Head } from '@inertiajs/react';

export default function PublicHome() {
    return (
        <AppPublicLayout>
            <Head title="Earth Dreams Edu" />

            <HeroSection />

            <div className="-mt-px bg-accent-foreground">
                <FeaturedUniversities className="py-12 sm:pt-10 sm:pb-20" />

                <Wrapper className="bg-gradient-to-b to-gray-800 pt-6 pb-20 text-gray-100 sm:py-20 shadow-xl">
                    <StatCards />
                </Wrapper>
            </div>

            <Wrapper className="pt-16 pb-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
}
