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
        heading: 'How We Operate',
        content:
            'Our process is transparent and student‑first. We map your journey end‑to‑end—discovery, shortlisting, applications, offers/CAS, visa, and arrival—so you always know what happens next. You’ll get timelines, document checklists, and communication you can rely on.',
    },
    {
        section: '1. Discovery',
        heading: '1) Discovery & Profile Review',
        content:
            'We understand your goals, academics, budget, and timelines, then assess admissibility for programs and intakes. We discuss trade‑offs (location, costs, teaching style) and align on outcomes before building your plan.',
    },
    {
        section: '2. Shortlisting',
        heading: '2) Shortlisting & Counselling',
        content:
            'We compare programs and intakes, discuss teaching styles, locations, and scholarship options, and agree on a balanced shortlist with reach, match, and safe choices. You’ll see why each option fits your profile.',
    },
    {
        section: '3. Applications',
        heading: '3) Applications & Documents',
        content:
            'We craft strong applications, review statements and references, and manage deadlines. You get a tracker for submitted and pending items, plus templates and examples to strengthen your materials.',
    },
    {
        section: '4. Offers & CAS',
        heading: '4) Offers, Conditions & CAS',
        content:
            'We help you understand offers, meet conditions, and prepare for CAS issuance. We align financial documentation and timelines to avoid delays and set up your next steps toward visa filing.',
    },
    {
        section: '5. Visa Guidance',
        heading: '5) Visa Guidance',
        content:
            'We support visa form completion, document checks, and interview preparation. You’ll know requirements, fees, processing expectations, and common pitfalls—so you submit confidently and on time.',
    },
    {
        section: '6. Pre‑Departure',
        heading: '6) Pre‑Departure & Accommodation',
        content: (
            <>
                From packing lists to local banking and{' '}
                <Link href={route('public.services.studentAccommodation')} className="text-theme-secondary underline-offset-2 hover:underline">
                    accommodation
                </Link>
                , we provide webinars and practical checklists. You’ll know what to carry, how to register for health services, and how to settle in.
            </>
        ),
    },
    {
        section: '7. Arrival',
        heading: '7) Arrival & Ongoing Support',
        content:
            'We stay available after you land—orientation tips, NHS registration guidance, and issue escalation via our support channels. If you face an administrative or housing challenge, we help you structure the next steps.',
    },
    {
        section: 'Ethics',
        heading: 'Transparency & Ethics',
        content:
            'Recommendations are evidence‑based, timelines are realistic, and communication is prompt. No inflated promises—just responsible guidance aligned to your profile and goals.',
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const HowWeOperatePage = () => {
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
            <Head title="How We Operate" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'how we operate'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            How We <span className="text-theme-secondary">Operate</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Our step-by-step process to get you from inquiry to arrival.
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

export default HowWeOperatePage;
