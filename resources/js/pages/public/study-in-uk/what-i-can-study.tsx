import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string; // sidebar label + anchor source
    heading: string; // visible section title
    content: React.ReactNode; // supports JSX for links, lists, etc.
};

const sections: SectionItem[] = [
    {
        section: 'What I Can Study',
        heading: 'What Can I Study in the UK as an International Student?',
        content: (
            <>
                Exploring education in the UK is a rewarding path for international students, with a blend of respected universities, diverse courses,
                and rich cultural experiences. Here's what you can expect when{' '}
                <Link
                    href={route('public.study.whyStudyInUK')}
                    className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full"
                >
                    studying in the UK
                </Link>{' '}
                and some guidance on which courses and universities might suit your goals.
            </>
        ),
    },
    {
        section: 'Why Study In The UK',
        heading: 'Why study in the UK?',
        content: (
            <>
                The United Kingdom is recognized worldwide for its top-tier educational institutions and is known for delivering high-quality,
                research-driven learning. Many students are drawn to the UK's commitment to academic excellence, cultural diversity, and an inclusive
                community. From the practical approach of its{' '}
                <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                    undergraduate programmes
                </Link>{' '}
                to the research focus of postgraduate studies, UK universities provide a supportive and challenging environment for international
                students.
            </>
        ),
    },
    {
        section: 'Popular Courses',
        heading: 'What are the most popular courses in the UK?',
        content: (
            <>
                <p className="leading-relaxed">
                    The UK offers a broad range of courses, providing you the opportunity to pursue nearly any field that might be of interest.
                    However, some areas of study are particularly popular, drawing students due to their career prospects, industry connections, and
                    academic reputation.
                </p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>Business and Management</strong> – International business, finance, marketing, and entrepreneurship.
                    </li>
                    <li>
                        <strong>Engineering</strong> – Especially civil, mechanical, aerospace; strong reputations at Imperial and Cambridge.
                    </li>
                    <li>
                        <strong>Computer Science & Data Science</strong> – CS, AI, and data programs for highly employable, cutting-edge skills.
                    </li>
                    <li>
                        <strong>Law</strong> – British law schools attract global applicants for law/IR/diplomacy (Oxford, UCL, etc.).
                    </li>
                    <li>
                        <strong>Creative Arts</strong> – Film, music, graphic design, fashion in a rich cultural ecosystem.
                    </li>
                    <li>
                        <strong>Medical & Health Sciences</strong> – Medicine, public health, and allied areas are consistently in demand.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Highest Paying Degrees',
        heading: 'What are the highest-paying degrees in the UK?',
        content: (
            <>
                <p className="leading-relaxed">
                    The earning potential associated with a degree often influences students' course choices, particularly for those aiming to balance
                    passion with financial security.
                </p>
                <p className="mt-4 font-semibold">These degrees are known for high starting salaries and long-term earning potential in the UK:</p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>Medicine & Dentistry</strong> – Strong starts with significant growth; Oxford/Cambridge/Imperial grads are sought
                        after.
                    </li>
                    <li>
                        <strong>Engineering</strong> – Chemical, electrical, civil see impressive salaries across energy, construction, manufacturing.
                    </li>
                    <li>
                        <strong>Computer Science & IT</strong> – Software, security, data; respected pipelines at Edinburgh and Imperial.
                    </li>
                    <li>
                        <strong>Business & Finance</strong> – Finance/accounting/economics feed into banking, consulting (LSE, Warwick, etc.).
                    </li>
                    <li>
                        <strong>Law</strong> – Corporate/international law paths from Oxford, UCL, KCL and more.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Best Universities',
        heading: 'What are the best universities in the UK for international students?',
        content: (
            <>
                <p className="leading-relaxed">
                    The UK is home to many world-respected institutions that generally boast culturally diverse student bodies.
                </p>
                <p className="mt-4 font-semibold">
                    Here are some of the top universities recognized for their academic excellence, international support, and global reputation:
                </p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>University of Oxford:</strong> Academic rigour, extensive resources, and strong support networks.
                    </li>
                    <li>
                        <strong>University of Cambridge:</strong> Global reputation across STEM and humanities with robust international support.
                    </li>
                    <li>
                        <strong>Imperial College London:</strong> Science/engineering/medicine/business powerhouse with London industry access.
                    </li>
                    <li>
                        <strong>London School of Economics (LSE):</strong> Social sciences focus; prime location for gov/finance/IO careers.
                    </li>
                    <li>
                        <strong>University of Edinburgh:</strong> Research-forward in AI, environment, humanities; strong international services.
                    </li>
                    <li>
                        <strong>University College London (UCL):</strong> Wide course range, diverse cohort, dynamic London experience.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Choose Right Course',
        heading: 'How do you choose the right course and university?',
        content: (
            <div className="grid gap-4">
                <p>
                    When selecting a{' '}
                    <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                        course
                    </Link>{' '}
                    and{' '}
                    <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                        university
                    </Link>
                    , align with your career goals, personal interests, and the learning experience you want. Compare curriculum, campus culture,
                    location, and support services.
                </p>
                <p>
                    Check graduate employability, industry links, and international support. Most universities run virtual open days and info
                    sessions.
                </p>
                <p>
                    For free personalized guidance,{' '}
                    <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                        book a call
                    </Link>{' '}
                    with one of our counsellors! We’ll map options to your background and ambitions.
                </p>
            </div>
        ),
    },
    {
        section: 'Application Process & Requirements',
        heading: 'What is the application process and what are the requirements?',
        content: (
            <>
                For undergraduate programmes, you generally submit your application through{' '}
                <a
                    href="https://www.ucas.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full"
                >
                    UCAS
                </a>
                , while postgraduate applications are handled directly by the university. Check specific English requirements (IELTS/TOEFL), and note
                that some programmes may require additional tests (e.g., GMAT for business, LNAT for law).
            </>
        ),
    },
    {
        section: 'Support for International Students',
        heading: 'Is there support for international students in the UK?',
        content: (
            <div className="grid gap-4">
                <p>
                    UK universities support internationals with visas, accommodation, cultural settling, language help, and career services. Expect
                    orientation events, cultural activities, and socials to help you integrate.
                </p>
                <p>
                    Studying in the UK lets you pick up practical skills, join a global community, and open doors to career growth—one big reason it’s
                    a top destination.
                </p>
                <p>
                    If you’re keen but want a hand planning it all,{' '}
                    <Link className="relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full">
                        book a free chat with our counsellors
                    </Link>{' '}
                    and we’ll help you lock in the best path.
                </p>
            </div>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const WhatICanStudy = () => {
    const ids = useMemo(() => sections.map((s) => idFrom(s.section)), []);
    const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0.0001,
            },
        );

        const sectionNodes = document.querySelectorAll('.section-anchor');
        sectionNodes.forEach((s) => observer.observe(s));
        return () => sectionNodes.forEach((s) => observer.unobserve(s));
    }, []);

    return (
        <AppPublicLayout>
            <Head title="Study In UK" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'universities'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-6 sm:pt-40">
                        <h1 className="text-3xl font-bold text-secondary capitalize sm:text-4xl">
                            What you can <span className="text-theme-accent">Study</span> In The <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-2xl text-start text-muted/80 sm:text-center sm:text-xl">
                            Discover a world of opportunities with our curated list of top universities. Find the perfect fit for your academic
                            journey and career aspirations.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
                {/* Sidebar */}
                <ul className="top-24 flex w-full flex-col gap-6 self-start border-b pb-6 text-muted-foreground md:sticky md:mr-6 md:w-3/12 md:gap-4 md:border-0 md:py-2 md:text-lg">
                    <li>
                        <p className="border-b pb-2 text-center font-semibold text-theme-foreground md:text-start md:text-base">Table of Content</p>
                    </li>
                    {sections.map((s, idx) => {
                        const id = idFrom(s.section);
                        return (
                            <li key={idx}>
                                <a
                                    href={`#${id}`}
                                    className={cn(activeId === id ? 'border-l-4 border-theme pl-2 font-semibold text-theme' : 'hover:text-theme/70')}
                                >
                                    {s.section}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Main Content — FLAT/MINIMAL, rendered from sections[] */}
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

export default WhatICanStudy;
