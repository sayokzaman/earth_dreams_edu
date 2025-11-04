import { Step, TimelineStepper } from '@/components/stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';

const cards: { icon: typeof ClockIcon; title: string; description: string }[] = [
    {
        icon: ClockIcon,
        title: 'Extra Preparation Time',
        description: 'Additional months to finalize documents, improve English test scores, or arrange finances before starting studies.',
    },
    {
        icon: ClockIcon,
        title: 'Smaller Class Sizes',
        description: 'More personalized learning experience with greater access to professors and university resources.',
    },
    {
        icon: ClockIcon,
        title: 'Better Accommodation',
        description: 'Less competitive student accommodation market makes it easier to secure on-campus or nearby housing.',
    },
    {
        icon: ClockIcon,
        title: 'Flexible Entry',
        description: 'Second chance to start without waiting an entire year for students who miss the September deadline.',
    },
    {
        icon: ClockIcon,
        title: 'Scholarship Opportunities',
        description: 'UK universities continue to offer scholarships and bursaries for September entrants.',
    },
    {
        icon: ClockIcon,
        title: 'Quality Education',
        description: "Same degree value and recognition regardless of intake, with UK's globally renowned education standards.",
    },
];

const entryCards: { icon: typeof ClockIcon; title: string; items: string[] }[] = [
    {
        icon: ClockIcon,
        title: 'Undergraduate',
        items: [
            'Completion of secondary education (A-levels, IB, or equivalent)',
            'Minimum grades as specified by university',
            'English proficiency test (IELTS 6.0+ or equivalent)',
            'Personal statement and references',
        ],
    },
    {
        icon: ClockIcon,
        title: 'Postgraduate',
        items: [
            "Recognized Bachelor's degree (55-60 % or equivalent GPA)",
            'Academic transcripts',
            'English proficiency test (IELTS 6.5+ or equivalent)',
            'Statement of purpose and references',
        ],
    },
    {
        icon: ClockIcon,
        title: 'English Proficiency',
        items: [
            'IELTS: 6.0 – 7.0 (course-dependent)',
            'TOEFL: 80 – 100 (course-dependent)',
            'PTE Academic: 59 – 70',
            'Alternative tests accepted by some universities',
        ],
    },
];

const applicationTimeline: Step[] = [
    {
        number: 1,
        period: 'Sep – Oct 2025',
        title: 'Research universities and shortlist courses',
        points: ['Explore university options and course requirements', 'Prepare required documents', 'Take English proficiency tests if needed'],
    },
    {
        number: 2,
        period: 'Oct – Dec 2025',
        title: 'Submit applications before deadlines',
        points: ['Complete and submit university applications', 'Submit personal statements and references', 'Pay application fees'],
    },
    {
        number: 3,
        period: 'Nov – Dec 2025',
        title: 'Receive offers and prepare for enrollment',
        points: ['Receive admission offers', 'Confirm admission and secure CAS', 'Arrange finances and accommodation'],
    },
    {
        number: 4,
        period: 'Dec – Jan 2026',
        title: 'Apply for student visa',
        points: ['Submit UK student visa application', 'Attend visa appointment', 'Receive visa decision'],
    },
    {
        number: 5,
        period: 'Jan – Feb 2026',
        title: 'Travel to UK and begin classes',
        points: ['Travel to the UK', 'Complete university registration', 'Begin your academic journey'],
    },
];

const services: { icon: typeof ClockIcon; title: string; description: string }[] = [
    {
        icon: ClockIcon,
        title: 'University & Course Selection',
        description: 'Personalised shortlisting from 140+ partner universities to find your perfect match.',
    },
    { icon: ClockIcon, title: 'Personalised Counselling', description: 'One-on-one guidance tailored to your aspirations, background and budget.' },
    {
        icon: ClockIcon,
        title: 'Application Support',
        description: 'Step-by-step help with forms, documents and deadlines to maximise your chances.',
    },
    {
        icon: ClockIcon,
        title: 'Personal Statement Editing',
        description: 'Professional feedback to craft compelling, UCAS-ready personal statements.',
    },
    {
        icon: ClockIcon,
        title: 'UK Student Visa Support',
        description: 'Complete visa application assistance, document checks and interview tips.',
    },
    {
        icon: ClockIcon,
        title: 'Accommodation Support',
        description: 'Safe, affordable housing options close to your campus — booked before you arrive.',
    },
    {
        icon: ClockIcon,
        title: 'Scholarship Guidance',
        description: 'Advice on funding opportunities and scholarship applications to reduce costs.',
    },
    {
        icon: ClockIcon,
        title: 'Pre-departure Briefings',
        description: 'Practical workshops on UK life, banking, health cover and culture.',
    },
    {
        icon: ClockIcon,
        title: 'Post-arrival Support',
        description: 'Ongoing help to settle in, register with police, GP and open a bank account.',
    },
];

const IntakeJanuary = () => {
    return (
        <AppPublicLayout>
            <Head title="September Intake" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'universities'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-6 sm:pt-40">
                        <h1 className="text-3xl font-bold text-secondary capitalize sm:text-4xl">September Intake</h1>
                        <p className="max-w-2xl text-start text-muted/80 sm:text-center sm:text-xl">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi ducimus doloribus error aut veritatis iste natus iure nemo
                            officiis quam.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="text-theme-foreground">
                <div className="grid gap-4 py-12">
                    <h1 className="text-center text-3xl font-bold text-theme">Why Choose September Intake?</h1>

                    <p className="text-center">
                        The September intake offers several advantages for international students looking to study in the UK.
                    </p>

                    <div className="mx-auto mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:w-10/12">
                        {cards.map((card, index) => (
                            <Card key={index} className="shadow-md transition-transform duration-200 ease-in-out hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <card.icon className="h-4 w-4" />
                                        {card.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 py-12">
                    <h1 className="text-center text-3xl font-bold text-theme">Entry Requirements</h1>

                    <p className="text-center">Understanding what you need to qualify for September 2026 intake.</p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {entryCards.map((card, index) => (
                            <Card key={index} className="shadow-md transition-transform duration-200 ease-in-out hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg text-theme">
                                        <card.icon className="h-4 w-4" />
                                        {card.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc space-y-2 pl-6 text-theme-foreground">
                                        {card.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 py-12">
                    <h1 className="text-center text-3xl font-bold text-theme">Application Timeline for September 2026 Intake</h1>

                    <p className="text-center">Your step-by-step journey to studying in the UK</p>

                    <div className="mt-6">
                        <TimelineStepper steps={applicationTimeline} />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4 py-12">
                    <h1 className="text-center text-3xl font-bold text-theme">How EDEC Can Help You</h1>

                    <p className="text-center">Comprehensive support throughout your UK study journey completely free of charge.</p>

                    <ul className="mx-auto grid w-full max-w-6xl gap-6 pt-6">
                        {services.map((service, index) => (
                            <li key={index} className="flex items-center gap-4">
                                <service.icon className="h-6 w-6" />

                                <div>
                                    <h3 className="text-lg font-semibold text-theme">{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex w-full justify-center pb-12">
                    <Link>
                        <Button size="lg">
                            Get Free Consultation Today
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </Wrapper>
        </AppPublicLayout>
    );
};

export default IntakeJanuary;
