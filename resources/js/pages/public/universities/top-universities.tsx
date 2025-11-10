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
        heading: 'UK Universities for International Students',
        content: (
            <>
                <p>
                    The UK is one of the most popular destinations for higher education, known for academic excellence, cultural diversity, and
                    world-class research.{' '}
                    <Link href="/placeholder" className={linkClass}>
                        UK universities
                    </Link>{' '}
                    continue to attract thousands of international students due to their global reputation and career outcomes.
                </p>
                <p className="mt-4">
                    This guide breaks down everything international students need — from{' '}
                    <Link href="/placeholder" className={linkClass}>
                        popular courses
                    </Link>{' '}
                    to admission requirements, financial planning, post-study work, and how to choose the right university for your goals.
                </p>
            </>
        ),
    },
    {
        section: 'Advantages',
        heading: 'Advantages of Choosing the UK for Higher Education',
        content: (
            <>
                <p>
                    The UK is home to some of the world’s top universities and globally recognised degrees. International students benefit from a
                    combination of prestige, culture, and opportunity.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Global recognition:</span> UK degrees are valued by employers and governments worldwide.
                    </li>
                    <li>
                        <span className="font-semibold">Diverse culture:</span> Over 150 nationalities study in the UK, creating an inclusive global
                        student body.
                    </li>
                    <li>
                        <span className="font-semibold">Shorter degree duration:</span> Most undergraduate courses are three years, and master’s
                        degrees last one year — saving time and cost.
                    </li>
                    <li>
                        <span className="font-semibold">Research excellence:</span> UK universities are global leaders in research, especially in
                        engineering, medicine, and social sciences.
                    </li>
                    <li>
                        <span className="font-semibold">Student lifestyle:</span> Vibrant cities, history, and modern innovation make studying here
                        unforgettable.
                    </li>
                    <li>
                        <span className="font-semibold">Career prospects:</span> Strong ties to global industries lead to internships and top
                        employment rates.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Top Universities',
        heading: 'Top Choice UK Universities for International Students',
        content: (
            <>
                <p>The UK hosts world-renowned universities, including:</p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <ul className="list-disc space-y-1 pl-6">
                        <li>University for the Creative Arts (UCA)</li>
                        <li>University of Kent</li>
                        <li>University of East London</li>
                        <li>University of Hull</li>
                        <li>University of South Wales</li>
                        <li>Wrexham University</li>
                        <li>University of Dundee</li>
                        <li>UWE Bristol</li>
                        <li>Regent College London (RCL Group)</li>
                        <li>Amity University London</li>
                    </ul>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>University of Buckingham</li>
                        <li>University of Derby</li>
                        <li>University of Gloucestershire</li>
                        <li>University of Salford</li>
                        <li>University of Sunderland</li>
                        <li>University of Central Lancashire</li>
                        <li>Heriot-Watt University</li>
                        <li>Coventry University</li>
                        <li>Roehampton University</li>
                        <li>Arts University Bournemouth</li>
                    </ul>
                </div>
                <p className="mt-4 font-medium">Other notable mentions:</p>
                <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Staffordshire University:</span> Leading in gaming, digital technologies, computing, and
                        forensic science.
                    </li>
                    <li>
                        <span className="font-semibold">Cardiff Metropolitan University:</span> Known for management, health sciences, and art &
                        design excellence.
                    </li>
                    <li>
                        <span className="font-semibold">Teesside University:</span> Strong in engineering, computer science, and entrepreneurship.
                    </li>
                    <li>
                        <span className="font-semibold">University of Bedfordshire:</span> Recognised for business, nursing, and affordability.
                    </li>
                    <li>
                        <span className="font-semibold">University of Hull London (CEG):</span> Specialises in renewable energy, logistics, and
                        business.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Popular Courses',
        heading: 'Popular Courses for International Students',
        content: (
            <>
                <p>International students in the UK pursue diverse fields of study. The most popular choices include:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>Engineering</li>
                    <li>Law</li>
                    <li>Business & Management</li>
                    <li>Computer Science & IT</li>
                    <li>Health Sciences</li>
                    <li>Social Sciences</li>
                </ul>
            </>
        ),
    },
    {
        section: 'Admissions',
        heading: 'Admission Considerations for International Students',
        content: (
            <>
                <p>To apply for UK universities, international students typically need to meet these criteria:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Entry requirements:</span> Undergraduate applicants need a high school diploma; postgraduates
                        require a bachelor’s degree or equivalent experience.
                    </li>
                    <li>
                        <span className="font-semibold">English proficiency:</span> IELTS or similar test required — minimum 6.0 to 6.5 for
                        undergraduate, 6.5–7.5 for postgraduate.
                    </li>
                    <li>
                        <span className="font-semibold">Application timelines:</span> The{' '}
                        <Link href="/placeholder" className={linkClass}>
                            September intake
                        </Link>{' '}
                        is the most popular, followed by{' '}
                        <Link href="/placeholder" className={linkClass}>
                            January
                        </Link>{' '}
                        and{' '}
                        <Link href="/placeholder" className={linkClass}>
                            May
                        </Link>{' '}
                        intakes at select universities.
                    </li>
                </ul>
                <p className="mt-4">
                    Write a strong personal statement, apply early for scholarships, and get help from expert counsellors to avoid mistakes.
                </p>
            </>
        ),
    },
    {
        section: 'Cost & Financial Planning',
        heading: 'Cost & Financial Planning',
        content: (
            <>
                <p>
                    The{' '}
                    <Link href="/placeholder" className={linkClass}>
                        cost of studying in the UK
                    </Link>{' '}
                    depends on your course and institution:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Tuition fees:</span> £11,000–£38,000 per year depending on program.
                    </li>
                    <li>
                        <span className="font-semibold">Living costs:</span> £9,000–£15,000 per year on average, depending on city and lifestyle.
                    </li>
                    <li>
                        <span className="font-semibold">Scholarships:</span> Universities and organisations offer merit, need-based, and
                        subject-specific awards.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Career Prospects',
        heading: 'Work & Career Prospects After Graduation',
        content: (
            <>
                <p>The UK offers excellent post-study opportunities for international graduates:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Graduate Route Visa:</span> Stay in the UK up to two years after graduation (three for PhDs).
                    </li>
                    <li>
                        <span className="font-semibold">Employment opportunities:</span> High demand in finance, healthcare, technology, and
                        engineering.
                    </li>
                    <li>
                        <span className="font-semibold">Networking:</span> Connect with top professionals and alumni worldwide, unlocking global
                        career advantages.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Choosing the Right University',
        heading: 'How to Choose the Right University for You',
        content: (
            <>
                <p>When selecting a university, international students should evaluate key factors like:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>
                        <span className="font-semibold">Academic profile:</span> Ensure the course aligns with your academic goals.
                    </li>
                    <li>
                        <span className="font-semibold">Location:</span> Decide if you prefer a large city or smaller student town.
                    </li>
                    <li>
                        <span className="font-semibold">Cost:</span> Check that tuition and living costs match your budget.
                    </li>
                    <li>
                        <span className="font-semibold">Facilities:</span> Evaluate labs, libraries, and support services.
                    </li>
                    <li>
                        <span className="font-semibold">Campus life:</span> Look for student clubs, societies, and diversity.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'How EDEC Can Help',
        heading: 'How EDEC Can Help',
        content: (
            <>
                <p>EDEC provides comprehensive free services for international students pursuing UK study dreams:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>University & Course Selection</li>
                    <li>Personalised Counselling</li>
                    <li>Application Support</li>
                    <li>Personal Statement Editing</li>
                    <li>Document Verification</li>
                    <li>University Interview Preparation</li>
                    <li>Scholarship & Financial Guidance</li>
                    <li>UK Student Visa Support</li>
                    <li>Pre-departure Briefings</li>
                    <li>Accommodation Support</li>
                    <li>Post-arrival Support in the UK</li>
                </ul>
            </>
        ),
    },
    {
        section: 'FAQs',
        heading: 'Frequently Asked Questions (FAQs)',
        content: (
            <>
                <p className="mt-2 font-semibold">What are the main university intakes in the UK?</p>
                <p>The September, January, and May intakes — with September being the most popular.</p>

                <p className="mt-4 font-semibold">How much does it cost to study in the UK?</p>
                <p>Tuition averages £11,000–£38,000 per year, plus £9,000–£15,000 for living costs.</p>

                <p className="mt-4 font-semibold">Can international students work while studying?</p>
                <p>
                    Yes, up to 20 hours per week during term and full-time during breaks. The Graduate Route Visa allows 2–3 years of post-study work.
                </p>

                <p className="mt-4 font-semibold">Are scholarships available?</p>
                <p>Yes. Universities and organisations offer merit-based, need-based, and country-specific awards.</p>

                <p className="mt-4">
                    Ready to begin your journey?{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Contact EDEC support
                    </Link>{' '}
                    today to start your UK university application.
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const TopUniversitiesPage = () => {
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
                            <span className="text-theme-accent">Russell Group</span> Universities
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

export default TopUniversitiesPage;
