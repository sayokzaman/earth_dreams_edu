import StudentReviews from '@/components/student-review';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Head, Link } from '@inertiajs/react';

const cards = [
    {
        title: 'Why Study In The UK',
        description: 'Discover what makes the UK one of the world’s most popular study destinations — from global recognition to diverse culture.',
        href: route('public.study.whyStudyInUK'),
        image: '/images/study-in-uk/why-study-in-uk.svg',
    },

    {
        title: 'What I Can Study',
        description: 'Explore the wide range of courses, degrees, and career pathways available at top UK universities.',
        href: route('public.study.canStudy'),
        image: '/images/study-in-uk/what-can-i-study.svg',
    },

    {
        title: 'January Intake',
        description: 'Start your academic journey early in the year. Learn which UK universities accept students for the January intake.',
        href: route('public.study.intake.january'),
        image: '/images/study-in-uk/january-intake.svg',
    },

    {
        title: 'May Intake',
        description: 'Find flexible study options through the May intake — perfect for students who missed the main deadlines.',
        href: route('public.study.intake.may'),
        image: '/images/study-in-uk/may-intake.svg',
    },

    {
        title: 'September Intake',
        description: 'Join the largest UK university intake of the year. See which courses and universities open their doors in September.',
        href: route('public.study.intake.september'),
        image: '/images/study-in-uk/september-intake.svg',
    },

    {
        title: 'Cost of Study',
        description: 'Get a clear breakdown of tuition fees, living costs, accommodation, and visa expenses for international students.',
        href: route('public.study.costOfStudy'),
        image: '/images/study-in-uk/cost-of-study.svg',
    },

    {
        title: 'UCAS',
        description: 'Learn how to apply to UK universities through UCAS — from requirements to step-by-step guidance and support.',
        href: route('public.study.ucas'),
        image: '/images/study-in-uk/ucas.svg',
    },

    {
        title: 'Student Essentials',
        description: 'Everything you need for student life in the UK — from scholarships and healthcare to housing and budgeting tips.',
        href: route('public.study.studentEssentials'),
        image: '/images/study-in-uk/student-essentials.svg',
    },
];

const StudyInUKIndex = () => {
    return (
        <AppPublicLayout>
            <Head title="Study In UK" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/study-in-uk.jpg`}
                    alt={'student essentials uk'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-[28rem]">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            {/* some copy about Courses */}
                            <span className="text-theme-accent">Study</span> In The <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-2xl">
                            World-class education and global exposure await. Shape your future in a country where innovation meets opportunity.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper>
                <main className="my-10 grid grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Content goes here */}
                    {cards.map((card) => (
                        <Link key={card.title} href={card.href}>
                            <Card className="h-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105">
                                <CardContent className="flex flex-col items-center justify-center gap-4">
                                    <img src={card.image} className="h-36 w-36" alt="" />

                                    <div className="grid gap-2">
                                        <CardTitle className="text-center text-lg text-black/85">{card.title}</CardTitle>

                                        <div className="flex h-full items-center justify-center">
                                            <CardDescription>{card.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </main>
            </Wrapper>

            <Wrapper className="pt-16 pb-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
};

export default StudyInUKIndex;
