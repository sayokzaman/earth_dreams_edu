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

            <div className="min-w-svw">
                <HeroSection />

                <div className="-mt-px bg-accent-foreground">
                    <FeaturedUniversities className="px-5 py-12 sm:px-20 sm:pt-14 sm:pb-20 xl:px-52" />

                    <div className="bg-gradient-to-b to-gray-800 px-6 pt-6 pb-20 text-gray-100 sm:px-20 sm:py-20 xl:px-52">
                        <StatCards />
                    </div>
                </div>

                <div className="px-5 pt-16 pb-12 sm:px-10 lg:px-52">
                    <StudentReviews />
                </div>
            </div>
        </AppPublicLayout>
    );
}
