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
        heading: 'Undergraduate Degrees in the UK for International Students',
        content: (
            <>
                <p>
                    Studying for an undergraduate degree in the UK is an exciting opportunity to gain a world-class education while exploring diverse
                    cultural experiences. UK degrees are recognized and respected globally, opening doors to exciting careers and personal growth.
                </p>
                <p className="mt-4">
                    Whether you're aiming for a career in business, engineering, health sciences, or the arts, the UK’s innovative approach to
                    education can help you reach your goals.
                </p>
            </>
        ),
    },
    {
        section: 'Types of Degrees',
        heading: 'What are the types of undergraduate degrees in the UK?',
        content: (
            <>
                <p>
                    Whether you want to focus on a single subject or explore multiple fields, the UK offers a variety of undergraduate degree options
                    to match your interests and career plans.
                </p>
                <p className="mt-4 font-semibold">Main types of undergraduate degrees include:</p>
                <ul className="mt-2 list-disc space-y-3 pl-6">
                    <li>
                        <span className="font-semibold">Bachelor’s degree:</span> Usually 3 years in England, Wales, and Northern Ireland (4 in
                        Scotland). Over 50,000 course options — Business, Engineering, Law, Humanities, etc. Combines lectures, seminars, and
                        practical projects to build both theory and real-world skills.
                    </li>
                    <li>
                        <span className="font-semibold">Joint honours degree:</span> 3–4 years, allowing students to study two subjects in depth (e.g.
                        English & History, Economics & Politics). Perfect for those interested in multidisciplinary learning.
                    </li>
                    <li>
                        <span className="font-semibold">Integrated master’s degree:</span> 4–5 years, combining undergraduate and postgraduate study.
                        Common in Science, Engineering, and Math fields, offering advanced research-oriented learning.
                    </li>
                    <li>
                        <span className="font-semibold">Top-up degree:</span> 1-year program for students who already hold a foundation degree, HND,
                        or associate qualification. Builds on prior learning to earn a full bachelor’s degree.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Entry Requirements',
        heading: 'What are the entry requirements for international students?',
        content: (
            <>
                <p>
                    Each UK undergraduate program has its own entry criteria, but most share similar academic and language requirements for
                    international students.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic qualifications:</span> Completion of high school or equivalent qualification, often
                        focusing on relevant subjects.
                    </li>
                    <li>
                        <span className="font-semibold">English language proficiency:</span> IELTS or TOEFL test results, typically requiring 6.0–6.5
                        in IELTS (or equivalent).
                    </li>
                    <li>
                        <span className="font-semibold">Additional requirements:</span> Competitive programs may require portfolios, interviews, or
                        entrance exams.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Not sure if you qualify? University admissions teams or study abroad advisors can help assess your eligibility.
                </p>
            </>
        ),
    },
    {
        section: 'Application Process',
        heading: 'How to apply for an undergraduate degree in the UK',
        content: (
            <>
                <p>
                    Applying to{' '}
                    <Link href="/placeholder" className={linkClass}>
                        study in the UK
                    </Link>{' '}
                    is straightforward — most students apply through UCAS, the UK’s centralized system, or directly to universities for some courses.
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Research your options:</span> Find programs that match your goals and academic background.
                    </li>
                    <li>
                        <span className="font-semibold">Prepare documents:</span> Gather transcripts, English test scores, a personal statement, and
                        references.
                    </li>
                    <li>
                        <span className="font-semibold">Submit your application:</span> Through UCAS or the university’s website.
                    </li>
                    <li>
                        <span className="font-semibold">Receive offers:</span> Offers may be conditional (with specific requirements) or
                        unconditional.
                    </li>
                    <li>
                        <span className="font-semibold">Acceptance & visa process:</span> Once accepted, begin your student visa application and
                        accommodation planning.
                    </li>
                </ol>
            </>
        ),
    },
    {
        section: 'Costs',
        heading: 'How much does an undergraduate degree cost in the UK?',
        content: (
            <>
                <p>Here’s an overview of what international students typically spend each year:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Tuition fees:</span> £12,000 – £30,000 per year, depending on the course and university.
                    </li>
                    <li>
                        <span className="font-semibold">Living expenses:</span> £10,000 – £15,000 annually (higher in London and large cities).
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Many UK universities offer scholarships and financial aid based on merit or need — check early to secure available funding.
                </p>
            </>
        ),
    },
    {
        section: 'Support Services',
        heading: 'What support services are available for international students?',
        content: (
            <>
                <p>
                    UK universities are known for offering comprehensive support systems to help international students settle in and succeed both
                    academically and personally.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">International student advisors:</span> Assistance with immigration, financial guidance, and
                        general well-being.
                    </li>
                    <li>
                        <span className="font-semibold">Orientation programs:</span> Help you adapt to life in the UK and connect with other students.
                    </li>
                    <li>
                        <span className="font-semibold">Academic support:</span> Access to tutoring, workshops, and digital learning resources.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Accommodation',
        heading: 'What are the accommodation options for undergraduate students?',
        content: (
            <>
                <p>Most universities offer both on-campus and off-campus housing options designed for international students’ needs.</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">On-campus housing:</span> Single rooms, shared flats, or studio apartments — usually close to
                        campus with access to student facilities.
                    </li>
                    <li>
                        <span className="font-semibold">Off-campus options:</span> Shared or private apartments offering more independence and
                        flexibility.
                    </li>
                </ul>
                <p className="mt-4">
                    Living on campus is a popular choice for first-year students, helping them make friends and adapt quickly to university life.
                </p>
            </>
        ),
    },
    {
        section: 'Work Opportunities',
        heading: 'What work opportunities are there for undergraduate students?',
        content: (
            <>
                <p>
                    International students in the UK can work part-time during their studies, which helps cover expenses and build professional
                    experience.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">During term time:</span> Up to 20 hours per week in part-time roles such as retail,
                        hospitality, or university jobs.
                    </li>
                    <li>
                        <span className="font-semibold">During holidays:</span> Full-time work permitted, providing a chance to earn and gain
                        experience.
                    </li>
                    <li>
                        <span className="font-semibold">Internships & placements:</span> Many programs include work placements, helping students gain
                        industry skills and connections.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Balancing part-time work with studies builds valuable skills, eases financial pressure, and enhances employability after
                    graduation.
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const UndergraduatePage = () => {
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
                            Undergraduate Courses
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

export default UndergraduatePage
;
