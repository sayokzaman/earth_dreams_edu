import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string;
    heading: string;
    content: React.ReactNode;
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Student Accommodation Support',
        content:
            'Finding the right accommodation is one of the most important steps when moving abroad. We help you understand your options, evaluate locations, and secure housing that fits your budget and lifestyle—whether university-managed halls, private rentals, or shared flats.',
    },
    {
        section: 'Accommodation Types',
        heading: 'Types of Student Accommodation',
        content:
            'University halls offer proximity to campus, built-in social networks, and inclusive utilities. Private rentals provide more independence and choice but require budgeting for bills. Shared houses are popular for second-year students who want flexibility and lower costs. Homestays suit those seeking cultural immersion and family support.',
    },
    {
        section: 'Location',
        heading: 'Choosing the Right Location',
        content:
            'Consider commute time, safety, and access to groceries, transport, and campus facilities. Living closer to campus simplifies schedules but may cost more. Suburban or outer zones offer better value and quieter environments. Research neighborhoods, read reviews, and check transport links before committing.',
    },
    {
        section: 'Budgeting',
        heading: 'Budgeting for Accommodation',
        content:
            'Set a realistic budget that includes rent, deposits, utilities, internet, and council tax (if applicable). University halls often bundle costs; private rentals require separate bill payments. Factor in one-time costs like agency fees, insurance, and furnishings. Reserve funds for unexpected repairs or changes.',
    },
    {
        section: 'How We Help',
        heading: 'How We Assist You',
        content: (
            <>
                We provide shortlists of verified accommodation providers, explain contracts and tenant rights, and guide you through viewings
                (virtual or in-person). We help you understand deposit protection schemes, tenancy agreements, and how to avoid scams. For urgent
                cases, we connect you with temporary housing options while you finalize long-term arrangements.
            </>
        ),
    },
    {
        section: 'Contracts',
        heading: 'Understanding Tenancy Agreements',
        content:
            "Read contracts carefully before signing. Check lease duration, notice periods, deposit terms, and responsibilities for repairs. Confirm what's included (furniture, utilities, internet) and clarify restrictions on guests or subletting. Keep copies of all documents and communication with landlords.",
    },
    {
        section: 'Safety',
        heading: 'Safety & Security',
        content:
            'Verify landlord credentials and property licenses. Check for working smoke alarms, secure locks, and emergency exits. Research crime rates in the area and read tenant reviews. Register your accommodation address with your university and ensure you have contents insurance.',
    },
    {
        section: 'Arrival',
        heading: 'Moving In & Settling',
        content:
            'Arrange key collection and inspection before your course starts. Document the property condition with photos and report issues immediately. Set up utilities, internet, and register with local authorities if required. Join student groups to meet flatmates and learn about the neighborhood.',
    },
    {
        section: 'Support',
        heading: 'Ongoing Support',
        content: (
            <>
                If issues arise—maintenance delays, disputes, or contract confusion—we help you escalate with landlords and university housing
                services. Need to change accommodation mid-year? We guide you through notice periods and alternative options. Questions?{' '}
                <Link href={route('public.consultation.index')} className="text-theme-secondary hover:underline">
                    Book a consultation
                </Link>{' '}
                anytime.
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const StudentAccommodationPage = () => {
    const ids = useMemo(() => sections.map((s) => idFrom(s.section)), []);
    const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0.0001 },
        );

        const sectionNodes = document.querySelectorAll('.section-anchor');
        sectionNodes.forEach((s) => observer.observe(s));
        return () => sectionNodes.forEach((s) => observer.unobserve(s));
    }, []);

    return (
        <AppPublicLayout>
            <Head title="Student Accommodation" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'student accommodation'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            Student <span className="text-theme-secondary">Accommodation</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Find safe, affordable housing that fits your budget and campus life.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
                <ul className="top-24 flex w-full flex-col gap-2 self-start border-b pb-6 text-muted-foreground md:sticky md:mr-6 md:w-3/12 md:border-0 md:py-2">
                    <li>
                        <p className="border-b pb-2 text-center font-semibold text-theme-foreground md:text-start">Table of Content</p>
                    </li>
                    {sections.map((s, idx) => {
                        const id = idFrom(s.section);
                        return (
                            <li key={idx}>
                                <a
                                    href={`#${id}`}
                                    className={cn(
                                        'flex items-center gap-2 px-2 py-2 transition-colors',
                                        activeId === id
                                            ? 'border-l-4 border-theme bg-muted/40 font-semibold text-theme'
                                            : 'hover:bg-muted/30 hover:text-theme-foreground',
                                    )}
                                >
                                    {s.section}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="text-lg leading-9 text-theme-foreground md:w-2/3 md:border-l md:pl-6">
                    {sections.map((s, idx) => {
                        const id = idFrom(s.section);
                        const isFirst = idx === 0;
                        return (
                            <section
                                key={id}
                                id={id}
                                className={cn(
                                    'section-anchor',
                                    idx === sections.length - 1 ? '' : 'border-b',
                                    isFirst ? 'py-10 md:pt-0 md:pb-10' : 'py-10',
                                )}
                            >
                                <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                <h2 className="bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                                    {s.heading}
                                </h2>
                                <p className="mt-4">{s.content}</p>
                            </section>
                        );
                    })}
                </div>
            </Wrapper>

            <Wrapper className="py-12">
                <StudentReviews />
            </Wrapper>
        </AppPublicLayout>
    );
};

export default StudentAccommodationPage;
