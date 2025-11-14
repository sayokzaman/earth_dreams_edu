import ConsultationForm from '@/components/consultation-form';
import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Head } from '@inertiajs/react';

const ConsultationIndex = () => {
    return (
        <AppPublicLayout>
            <Head title="Consultation" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/courses.jpg`}
                    alt={'student essentials uk'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-[28rem]">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            Book a <span className="text-theme-accent">Free</span> <span className="text-theme-secondary">Consultation</span> Today
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Speak with our expert advisors to explore your study options and get personalized guidance.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <div className="flex justify-center">
                <div className="mt-10 mb-6 block w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-center text-3xl leading-tight font-extrabold tracking-tight text-transparent sm:text-4xl">
                    <h1>Provide Your Details Below To Get Started</h1>
                </div>
            </div>

            <ConsultationForm />

            <Wrapper className="pt-16 pb-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
};

export default ConsultationIndex;
