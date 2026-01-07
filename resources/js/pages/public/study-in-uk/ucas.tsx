import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string; // TOC label + anchor
    heading: string; // Section H2
    content: React.ReactNode; // Supports JSX for lists/links
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'UCAS Application Guide for UK Universities',
        content: (
            <>
                <p className="leading-relaxed">
                    UCAS (Universities and Colleges Admissions Service) manages nearly all university applications in the UK. It simplifies the
                    process, letting students apply to multiple universities through a single system.
                </p>
                <p className="mt-4">
                    For both undergraduate and postgraduate levels, UCAS offers a smooth, user-friendly experience for both local and international
                    students who want to{' '}
                    <Link
                        href={route('public.study.index')}
                        className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full"
                    >
                        study in the UK
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        section: 'UCAS Support for International Students',
        heading: 'UCAS application support for international students',
        content: (
            <>
                <p className="leading-relaxed">
                    Even with UCAS’s intuitive design, the process can be stressful — especially for international students. That’s why our specialist
                    counsellors at <strong>EDEC</strong> offer a free service to guide students throughout every stage of the UCAS journey.
                </p>
                <p className="mt-4">
                    Experts help with choosing the right course, preparing required documents, writing your personal statement, and ensuring
                    everything’s submitted on time. Note: from <strong>September 2025</strong> onwards, personal statements will switch to 3
                    structured questions instead of a single long essay.
                </p>
            </>
        ),
    },
    {
        section: 'Requirements to Apply',
        heading: 'What do you need to apply through UCAS?',
        content: (
            <>
                <p className="leading-relaxed">Before applying, ensure you meet all eligibility requirements:</p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>Completed or currently completing secondary education</li>
                    <li>Meet entry requirements for chosen courses/universities</li>
                    <li>Proof of English proficiency (IELTS/TOEFL, if required)</li>
                    <li>Valid passport or ID (for international students)</li>
                </ul>
            </>
        ),
    },
    {
        section: 'Application Steps',
        heading: 'How do you apply to UK universities via UCAS?',
        content: (
            <>
                <p className="font-semibold">Follow these main steps:</p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>Research:</strong>{' '}
                        <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                            Explore courses
                        </Link>{' '}
                        that match your goals.
                    </li>
                    <li>
                        <strong>Register:</strong> Create your UCAS account.
                    </li>
                    <li>
                        <strong>Fill Out Application:</strong> Enter your personal and academic info.
                    </li>
                    <li>
                        <strong>Write Personal Statement:</strong> Showcase achievements and motivation.
                    </li>
                    <li>
                        <strong>Submit References:</strong> Academic references from teachers/counsellors.
                    </li>
                    <li>
                        <strong>Pay Application Fee:</strong> Complete payment.
                    </li>
                    <li>
                        <strong>Submit Application:</strong> Review and send before the deadline.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Registration Fees & Documents',
        heading: 'UCAS Registration Fees & Required Documents',
        content: (
            <>
                <p className="font-semibold">Application fees:</p>
                <ul className="mt-2 grid list-disc gap-2 pl-6">
                    <li>Single choice: £22</li>
                    <li>Multiple choices (up to 5): £26.50</li>
                </ul>

                <p className="mt-4 font-semibold">Documents Checklist:</p>
                <ul className="mt-2 grid list-disc gap-2 pl-6">
                    <li>Academic transcripts & certificates</li>
                    <li>English test scores (IELTS, TOEFL)</li>
                    <li>Personal statement</li>
                    <li>Passport/ID</li>
                    <li>Reference letters</li>
                </ul>
            </>
        ),
    },
    {
        section: 'UCAS Extra & Clearing',
        heading: 'UCAS Extra & Clearing',
        content: (
            <>
                <p className="leading-relaxed">
                    <strong>UCAS Extra</strong> helps students who used all five choices but hold no offers. It runs from{' '}
                    <strong>late February to early July</strong> and allows applying for additional courses.
                </p>
                <p className="mt-4 leading-relaxed">
                    <strong>Clearing</strong> starts after A-level results. It helps those without offers find available spots. While great for
                    last-minute options, it’s best not to rely on it as there’s no guarantee your preferred university will have space.
                </p>
            </>
        ),
    },
    {
        section: 'Tracking Application with EDEC',
        heading: 'Tracking Your Application with EDEC',
        content: (
            <>
                <p className="leading-relaxed">
                    EDEC’s tracking service keeps you updated after submission. You can monitor your progress, receive university decision updates,
                    and get guidance from advisors on next steps and offer responses.
                </p>
                <p className="mt-4">
                    Our{' '}
                    <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                        team of advisors
                    </Link>{' '}
                    is always available to help make your application journey as smooth as possible.
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const UCASGuidePage = () => {
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
            <Head title="UCAS Application Guide" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'universities'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-6 sm:pt-40">
                        <h1 className="text-3xl font-bold text-secondary capitalize sm:text-4xl">
                            <span className="text-theme-accent">UCAS</span> Application Guide for{' '}
                            <span className="text-theme-secondary">UK Universities</span>
                        </h1>
                        <p className="max-w-3xl text-start text-muted/80 sm:text-center sm:text-xl">
                            Everything you need to know about applying to UK universities through UCAS – from eligibility and documents to extra
                            services and tracking your application.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
                {/* Sidebar */}
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

                {/* Main Content — rendered from sections[] */}
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
                                <div className="mt-4">{s.content}</div>
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

export default UCASGuidePage;
