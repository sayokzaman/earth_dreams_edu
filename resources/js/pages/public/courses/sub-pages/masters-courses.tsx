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

const linkClass =
    'relative text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full';

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Master’s Degrees in the UK for International Students',
        content: (
            <>
                <p>
                    The UK is known for its exceptional postgraduate programs, offering master’s degrees that are internationally respected and
                    academically rigorous. Studying for a master’s in the UK not only deepens your expertise in a chosen field but also opens doors to
                    global career opportunities and professional networks.
                </p>
                <p className="mt-4">
                    With flexible programs, world-renowned institutions, and dedicated resources for international students, the UK provides a
                    supportive and stimulating environment to help you achieve your postgraduate ambitions.
                </p>
            </>
        ),
    },
    {
        section: 'Types of Degrees',
        heading: 'What types of master’s degrees are available in the UK?',
        content: (
            <>
                <p>
                    Master’s programs in the UK come in several formats to suit different goals, study preferences, and career paths. Here’s a
                    breakdown of the main types available:
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-6">
                    <li>
                        <span className="font-semibold">Taught master’s degrees (e.g., MA, MSc, MEng):</span>
                        Typically 1 year full-time or up to 2 years part-time. These focus on advanced coursework and project-based learning in
                        subjects like Arts, Science, Business, and Engineering. Includes seminars, lectures, and a dissertation or research project.
                    </li>
                    <li>
                        <span className="font-semibold">Research master’s degrees (e.g., MRes, MPhil):</span>
                        Usually 1–2 years. These emphasize independent research under academic supervision, ideal for students pursuing academia or
                        research-intensive careers. Focus on research design, methodologies, and data analysis.
                    </li>
                    <li>
                        <span className="font-semibold">Conversion master’s degrees:</span>
                        Typically 1 year, designed for students switching disciplines or career paths — common in Law, Computing, or Psychology.
                        Combines intensive foundational learning with discipline-specific coursework to build new expertise.
                    </li>
                    <li>
                        <span className="font-semibold">Integrated master’s degrees:</span>
                        Lasts 4–5 years, combining undergraduate and postgraduate study in one continuous program. Common in Science and Engineering,
                        ideal for students who want to progress seamlessly to a master’s level with research opportunities built in.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Entry Requirements',
        heading: 'What are the entry requirements for master’s programs in the UK?',
        content: (
            <>
                <p>
                    Requirements vary by course and university, but most UK master’s programs expect students to meet certain academic and language
                    standards:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic qualifications:</span>A relevant undergraduate degree (usually 2:1 or equivalent) in
                        a related field. Some programs accept 2:2 or alternative qualifications based on experience.
                    </li>
                    <li>
                        <span className="font-semibold">English language proficiency:</span>
                        Proof of English skills via{' '}
                        <Link href="/placeholder" className={linkClass}>
                            IELTS
                        </Link>{' '}
                        or{' '}
                        <Link href="/placeholder" className={linkClass}>
                            TOEFL
                        </Link>
                        , typically requiring around 6.5 in IELTS (some may vary).
                    </li>
                    <li>
                        <span className="font-semibold">Additional requirements:</span>
                        Some programs may ask for personal statements, references, portfolios, or interviews — especially for competitive or
                        research-focused courses.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Application Process',
        heading: 'How do you apply for a postgraduate degree in the UK?',
        content: (
            <>
                <p>
                    Applications for master’s programs are usually made directly to universities, though certain specialist programs may use
                    centralized systems.
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Research your options:</span>
                        Choose programs and universities aligned with your career goals and academic background.
                    </li>
                    <li>
                        <span className="font-semibold">Prepare your documents:</span>
                        You’ll need transcripts, English test scores, a CV, and a personal statement outlining your goals and motivation.
                    </li>
                    <li>
                        <span className="font-semibold">Submit your application:</span>
                        Apply directly to the university, or through UCAS Postgraduate if available.
                    </li>
                    <li>
                        <span className="font-semibold">Receive offers:</span>
                        Offers may be conditional (pending requirements) or unconditional.
                    </li>
                    <li>
                        <span className="font-semibold">Acceptance & visa process:</span>
                        Once accepted, apply for your student visa and arrange accommodation and travel.
                    </li>
                </ol>
            </>
        ),
    },
    {
        section: 'Costs',
        heading: 'How much does a master’s degree in the UK cost?',
        content: (
            <>
                <p>Tuition and living costs vary depending on the university, location, and program type. Here’s an overview:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Tuition Fees:</span>
                        £13,000 – £35,000 per year (specialized or prestigious universities may charge more).
                    </li>
                    <li>
                        <span className="font-semibold">Living Expenses:</span>
                        £10,000 – £15,000 per year, higher in London and major cities.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Scholarships and bursaries are widely available — often based on merit or need. Check both university and external funding options
                    early to secure support.
                </p>
            </>
        ),
    },
    {
        section: 'Support Services',
        heading: 'Are there support services for international master’s students?',
        content: (
            <>
                <p>
                    UK universities provide strong support systems to ensure international master’s students succeed both academically and socially.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic and research support:</span>
                        Access to supervisors, workshops, and postgraduate research resources.
                    </li>
                    <li>
                        <span className="font-semibold">Career services:</span>
                        Job placements, networking events, and workshops connecting you to industry professionals.
                    </li>
                    <li>
                        <span className="font-semibold">Wellbeing and social support:</span>
                        Orientation, mental health services, and international student networks to help you settle in and thrive.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Accommodation',
        heading: 'What accommodation options are there for master’s students?',
        content: (
            <>
                <p>As an international master’s student, you’ll find flexible housing options designed for postgraduate life.</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">University accommodation:</span>
                        On-campus housing with single or shared flats, ideal for connecting with the university community.
                    </li>
                    <li>
                        <span className="font-semibold">Private rentals:</span>
                        Independent living with options like shared apartments or studio flats for added privacy and flexibility.
                    </li>
                </ul>
                <p className="mt-4">
                    University housing is often preferred for convenience and community — it keeps you close to classes, libraries, and student life.
                </p>
            </>
        ),
    },
    {
        section: 'Work Opportunities',
        heading: 'Are there work opportunities when studying for a master’s degree?',
        content: (
            <>
                <p>
                    Master’s students on a student visa can work up to 20 hours per week during term time and full-time during holidays. Working while
                    studying helps with expenses and offers valuable industry experience.
                </p>
                <p className="mt-3">
                    Many students take part-time jobs or internships related to their field, building professional networks and boosting employability
                    in the UK job market.
                </p>
                <p className="mt-3">
                    A UK master’s degree gives you advanced expertise, international credibility, and connections that open global career doors.{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Book a free call today
                    </Link>{' '}
                    to get personalized advice on applying and preparing for your postgraduate journey.
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const FoundationCoursesPage = () => {
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
                            Masters Courses
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            A quick guide for international students — what the Russell Group is, why it matters, how to apply, funding options, and
                            career impact.
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

export default FoundationCoursesPage;
