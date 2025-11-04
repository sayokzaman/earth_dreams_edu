import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string; // Sidebar/anchor label
    heading: string; // Big section title in content
    content: React.ReactNode; // Supports string or JSX for links, etc.
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Student Essentials for Studying in the UK',
        content:
            'Moving to a new country is a huge step. From finding accommodation to setting up your phone connection, this guide covers all essentials that make your transition into UK student life smooth and stress-free.',
    },
    {
        section: 'Accommodation Assistance',
        heading: 'Accommodation Assistance',
        content: (
            <>
                Finding a suitable{' '}
                <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                    student accommodation
                </Link>{' '}
                can be tricky, especially in a new environment. EDEC helps you find a home that matches your preferences, location, and budget.
                Whether you prefer university-managed halls, private houses, or rented flats, our team ensures you find the perfect spot near your
                campus.
            </>
        ),
    },
    {
        section: 'Financial Planning',
        heading: 'Financial Planning',
        content: (
            <>
                Budgeting before you travel is crucial. EDEC helps you understand the{' '}
                <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                    cost associated with studying in the UK
                </Link>
                , from tuition to living expenses. Our experts also guide you through scholarships, savings strategies, and money management to keep
                your finances in check.
            </>
        ),
    },
    {
        section: 'Health and Safety',
        heading: 'Health and Safety',
        content:
            'Your well-being matters most. EDEC provides complete guidance on registering with the NHS, choosing health insurance, and finding local doctors. We also educate students on general safety, helping you stay secure and confident while studying in the UK.',
    },
    {
        section: 'Travel Arrangements',
        heading: 'Travel Arrangements',
        content: (
            <>
                EDEC assists you with all{' '}
                <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                    travel arrangements
                </Link>
                , including flight booking, airport pickup, and pre-departure checklists. We make sure you understand UK rules, packing essentials,
                and visa procedures before you fly.
            </>
        ),
    },
    {
        section: 'Cultural Orientation',
        heading: 'Cultural Orientation',
        content: (
            <>
                Adjusting to a new culture takes time. EDEC helps you get familiar with UK customs, local etiquette, and lifestyle.{' '}
                <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                    Our support
                </Link>{' '}
                ensures you blend into student life easily and feel at home from day one.
            </>
        ),
    },
    {
        section: 'Academic Preparation',
        heading: 'Academic Preparation',
        content:
            'We help you understand the UK education system, teaching methods, and assessment styles. Our advisors ensure you’re ready for exams, research, and academic success before your first class even starts.',
    },
    {
        section: 'Communication Setup',
        heading: 'Communication Setup',
        content:
            'Staying connected is essential. EDEC guides you on setting up mobile and internet services so you can contact your family easily. You’ll also learn about the most affordable service providers and communication tools to make student life simpler.',
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const StudentEssentialsPage = () => {
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
            <Head title="Student Essentials for Studying in the UK" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'student essentials uk'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            <span className="text-theme-accent">Student Essentials</span> for Studying in the{' '}
                            <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Everything international students need to know to settle in the UK smoothly — from accommodation to travel, culture, and
                            safety.
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

export default StudentEssentialsPage;
