import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string;
    heading: string;
    content: React.ReactNode;
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Success Stories & Achievements',
        content:
            'This page highlights common milestones achieved by international students on their study‑abroad journey: university offers, scholarships, visas, academic progress, and early career outcomes. The aim is to share realistic patterns and helpful practices—not one‑off anecdotes—so future students can prepare with confidence.',
    },
    {
        section: 'Offers',
        heading: 'University Offers Across Disciplines',
        content:
            'Strong offers typically follow from clear program fit, complete documentation, and timely submissions. Students with balanced shortlists (reach, match, safe), well‑structured statements, and aligned references see better results across business, engineering, computing, health, and arts programs.',
    },
    {
        section: 'Scholarships',
        heading: 'Scholarship Wins & Funding',
        content:
            'Scholarships are competitive and criteria vary. Early research, meeting eligibility (grades, portfolio, extracurriculars), and clean applications improve odds. Many students combine partial awards with savings and part‑time work; budgeting ahead and knowing deadlines is key.',
    },
    {
        section: 'Visas',
        heading: 'Visa Approvals & Readiness',
        content:
            'Successful visa outcomes are rooted in accurate forms, consistent finances, and document readiness. Students who follow guidance, prepare early, and avoid last‑minute changes typically experience smoother approvals and predictable timelines.',
    },
    {
        section: 'Academics',
        heading: 'Academic Progress & Retention',
        content:
            'First‑year success correlates with preparation on teaching methods, assessment styles, and workload. Students who plan schedules, join study groups, and seek feedback early maintain better grades, reduce stress, and progress on time.',
    },
    {
        section: 'Careers',
        heading: 'Internships & Early Careers',
        content:
            'Internships and placements often come from proactive networking, strong CVs, portfolio projects, and timely applications. Students who use university career services, attend events, and tailor applications to each role see improved outcomes.',
    },
    {
        section: 'Testimonials',
        heading: 'Student Experiences',
        content:
            'Experiences vary by profile and goals. Across stories, common themes emerge: planning, resilience, and using the support available on campus and in local communities.',
    },
    {
        section: 'What Helps',
        heading: 'What Typically Drives Success',
        content:
            'Clear goals, early timelines, complete documents, honest self‑assessment, and consistent communication. Being realistic about options and acting before deadlines are the most reliable predictors of positive outcomes.',
    },
    {
        section: 'Expectations',
        heading: 'Responsible Expectations',
        content:
            'Outcomes depend on individual profiles, institutional criteria, and timing. Admissions and scholarships are competitive; visa decisions follow policy. Set goals, prepare thoroughly, and treat each step as part of an overall plan rather than a standalone result.',
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const SuccessStoriesPage = () => {
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
            <Head title="Success Stories & Achievements" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'success stories and achievements'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            Success Stories <span className="text-theme-secondary">& Achievements</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Realistic, general patterns of success to guide future students—not marketing claims.
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

export default SuccessStoriesPage;
