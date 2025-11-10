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
        heading: 'Top-Up Degrees in the UK for International Students',
        content: (
            <>
                <p>
                    A top-up degree (also known as an advanced entry course) allows you to add to your existing qualifications and transform them into
                    an internationally recognised bachelor’s degree from a respected UK university. It’s ideal for students who have already completed
                    part of a higher education qualification such as a diploma, Higher National Diploma (HND), or an associate degree.
                </p>
                <p className="mt-4">
                    Instead of beginning a full three-year{' '}
                    <Link href="/placeholder" className={linkClass}>
                        undergraduate program
                    </Link>
                    , you can enter directly into the final year of a related course and graduate with a full bachelor’s degree in just one year.
                </p>
            </>
        ),
    },
    {
        section: 'Universities Offering Top-Up Degrees',
        heading: 'Which UK universities offer top-up courses?',
        content: (
            <>
                <p>Nearly 40 UK universities offer top-up degree programs. Some of the most popular include:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>University of Greenwich</li>
                    <li>Coventry University</li>
                    <li>University of Hertfordshire</li>
                    <li>Middlesex University</li>
                    <li>University of Portsmouth</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Many universities provide various options that match your previous studies, helping you transition smoothly into the final year
                    and complete your degree efficiently. Always check individual university websites for course availability and specific subject
                    options.
                </p>
            </>
        ),
    },
    {
        section: 'Eligibility Criteria',
        heading: 'What are the eligibility criteria for top-up degrees in the UK?',
        content: (
            <>
                <p>
                    While exact requirements depend on your chosen university and program, most top-up degrees in the UK require prior higher
                    education qualifications and proof of English proficiency.
                </p>
                <p className="mt-4 font-semibold">Typical eligibility criteria include:</p>

                <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Educational background:</span> Completion of a relevant qualification such as:
                        <ul className="mt-1 list-disc space-y-1 pl-6">
                            <li>
                                <span className="font-semibold">Diploma:</span> Usually equivalent to the first two years of a bachelor’s degree.
                            </li>
                            <li>
                                <span className="font-semibold">Higher National Diploma (HND):</span> UK or international work-related diploma
                                comparable to the first two years of university.
                            </li>
                            <li>
                                <span className="font-semibold">Associate Degree:</span> A two-year undergraduate qualification offered by colleges or
                                universities.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold">Academic performance:</span> Universities expect solid grades and a strong understanding of
                        your subject area, typically equivalent to the first two years of a bachelor’s program.
                    </li>
                    <li>
                        <span className="font-semibold">English language proficiency:</span> Proof of English through accepted tests such as:
                        <ul className="mt-1 list-disc space-y-1 pl-6">
                            <li>IELTS: 6.0 – 6.5 overall (no band below 5.5).</li>
                            <li>TOEFL: Equivalent score around 79–90 (iBT).</li>
                            <li>Other accepted tests: PTE Academic, Cambridge English exams, etc.</li>
                        </ul>
                        Many universities also offer pre-sessional English courses if you need to improve your proficiency.
                    </li>
                    <li>
                        <span className="font-semibold">Course-specific requirements:</span> Some fields (e.g., design, art, or engineering) may
                        require a portfolio, technical test, or subject prerequisites.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Check your chosen university’s course details carefully before applying. For support,{' '}
                    <Link href="/placeholder" className={linkClass}>
                        get in touch
                    </Link>{' '}
                    with an advisor.
                </p>
            </>
        ),
    },
    {
        section: 'Benefits',
        heading: 'What are the benefits of a top-up course in the UK?',
        content: (
            <>
                <p>
                    Top-up degrees offer an efficient and rewarding route to complete your bachelor’s qualification while gaining international
                    exposure and career-ready skills.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Direct entry to final year:</span> Skip the first two years and earn a full degree in just one
                        year.
                    </li>
                    <li>
                        <span className="font-semibold">Specialised, career-focused learning:</span> Courses are designed with real-world relevance,
                        preparing you for industry challenges.
                    </li>
                    <li>
                        <span className="font-semibold">Accelerated completion:</span> Graduate faster and save on tuition and living costs.
                    </li>
                    <li>
                        <span className="font-semibold">Develop cross-cultural skills:</span> Study in a diverse UK student environment that boosts
                        communication, collaboration, and global awareness.
                    </li>
                    <li>
                        <span className="font-semibold">Career-ready experience:</span> Build professional networks through case studies, hands-on
                        projects, and alumni connections.
                    </li>
                    <li>
                        <span className="font-semibold">University support services:</span> Benefit from full academic and personal support throughout
                        your studies.
                    </li>
                    <li>
                        <span className="font-semibold">Pathway to postgraduate study:</span> A top-up degree strengthens eligibility for{' '}
                        <Link href="/placeholder" className={linkClass}>
                            postgraduate programmes
                        </Link>{' '}
                        and advanced career roles.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Application Process',
        heading: 'What is the application process?',
        content: (
            <>
                <p>
                    Applying for a top-up degree in the UK is usually done through the university’s online portal, though some may accept applications
                    via{' '}
                    <Link href="/placeholder" className={linkClass}>
                        UCAS
                    </Link>
                    . Here’s a step-by-step overview:
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Choose your course and check requirements:</span> Review eligibility and ensure your previous
                        qualification aligns with the course.
                    </li>
                    <li>
                        <span className="font-semibold">Prepare documents:</span> Include transcripts, English test scores, proof of qualification,
                        and a personal statement.
                    </li>
                    <li>
                        <span className="font-semibold">Complete the online application:</span> Fill out forms accurately and attach required
                        documents via the university portal or UCAS.
                    </li>
                    <li>
                        <span className="font-semibold">Submit additional materials (if required):</span> Such as portfolios or professional
                        references for specific programs.
                    </li>
                    <li>
                        <span className="font-semibold">Attend interviews or assessments (if applicable):</span> Some competitive courses may require
                        these for further evaluation.
                    </li>
                    <li>
                        <span className="font-semibold">Wait for a decision:</span> Universities will review your profile and issue either a
                        conditional or unconditional offer.
                    </li>
                    <li>
                        <span className="font-semibold">Arrange your visa and accommodation:</span> Once accepted, apply for your student visa and
                        plan your arrival in the UK.
                    </li>
                </ol>
            </>
        ),
    },
    {
        section: 'Conclusion',
        heading: 'Ready to upgrade your education?',
        content: (
            <>
                <p>
                    Top-up degrees offer an affordable and efficient path to earning a globally respected qualification. You’ll gain access to top UK
                    universities, expert teaching, and a vibrant multicultural experience — all while boosting your career prospects.
                </p>
                <p className="mt-4">
                    If you’re ready to explore your options and find the best program for your goals,{' '}
                    <Link href="/placeholder" className={linkClass}>
                        book a call with us
                    </Link>{' '}
                    today and make your dream of studying in the UK a reality!
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const RussellGroupPage = () => {
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
                            Top up courses
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

export default RussellGroupPage;
