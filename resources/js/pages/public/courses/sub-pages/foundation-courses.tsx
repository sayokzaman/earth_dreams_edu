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
        heading: 'What is a foundation course in the UK?',
        content: (
            <>
                <p>
                    A foundation course in the UK is a preparatory programme designed to help international students meet the academic and language
                    requirements for undergraduate study at{' '}
                    <Link href="/placeholder" className={linkClass}>
                        UK universities
                    </Link>
                    . These courses build the essential subject knowledge, academic confidence, and English skills needed to succeed in higher
                    education.
                </p>
                <p className="mt-4">
                    They’re especially helpful for students from countries where the education system runs for fewer than 13 years—like Bangladesh,
                    India, Nigeria, and parts of the Middle East. Completing a foundation year ensures you’re fully ready to meet the standards
                    expected by UK universities.
                </p>
                <p className="mt-4">
                    Typically lasting one academic year, foundation programmes can sometimes be shorter or longer depending on your English
                    proficiency or study goals.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>Have finished school but don’t yet meet UK university entry requirements.</li>
                    <li>Need to strengthen English or academic skills before starting a degree.</li>
                    <li>Want a smoother transition into the UK’s academic environment.</li>
                </ul>
            </>
        ),
    },
    {
        section: 'Why Choose',
        heading: 'Why choose a foundation course?',
        content: (
            <>
                <p>
                    Foundation courses offer a strong start for international students, blending academic preparation with cultural adaptation. By the
                    end of your foundation year, you’ll be confident in research, writing, and presentation skills—ready to excel in degree-level
                    study.
                </p>
                <p className="mt-4">
                    These programmes also help you adjust to the UK’s independent study system, which values analytical thinking and creativity.
                    You’ll gain dedicated academic support while settling into university life abroad.
                </p>
                <p className="mt-4">
                    Once completed, most universities guarantee progression into{' '}
                    <Link href="/placeholder" className={linkClass}>
                        undergraduate courses
                    </Link>
                    , providing a direct path toward your chosen bachelor’s degree.
                </p>
            </>
        ),
    },
    {
        section: 'Universities Offering Foundation Courses',
        heading: 'Which UK universities offer foundation courses for international students?',
        content: (
            <>
                <p>
                    Many leading universities across the UK run foundation courses tailored for international students. These programmes cover various
                    disciplines—from business and science to art and engineering.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>King’s College London:</strong> One-year International Foundation Programme preparing students for undergraduate
                        study.{' '}
                        <Link href="/placeholder" className={linkClass}>
                            Learn more
                        </Link>
                    </li>
                    <li>
                        <strong>University of Southampton:</strong> Offers foundation options in Business, Humanities, and Life Sciences.{' '}
                        <Link href="/placeholder" className={linkClass}>
                            Learn more
                        </Link>
                    </li>
                    <li>
                        <strong>University of Edinburgh:</strong> Combines academic work with English support and study skills.{' '}
                        <Link href="/placeholder" className={linkClass}>
                            Learn more
                        </Link>
                    </li>
                    <li>
                        <strong>University of Manchester:</strong> Provides integrated foundation programmes for science, engineering, and biology.{' '}
                        <Link href="/placeholder" className={linkClass}>
                            Learn more
                        </Link>
                    </li>
                    <li>
                        <strong>University of Warwick:</strong> One-year course designed to prepare you for undergraduate study.{' '}
                        <Link href="/placeholder" className={linkClass}>
                            Learn more
                        </Link>
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Types of Foundation Courses',
        heading: 'What types of foundation courses are available in the UK?',
        content: (
            <>
                <p>
                    UK foundation courses are offered in a wide range of subjects, so you can align your choice with your future career and interests.
                    Each stream builds your academic skills for a specific field.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Business and Economics:</strong> Perfect for students pursuing management, finance, or international trade.
                    </li>
                    <li>
                        <strong>Science and Medicine:</strong> Leads to degrees in life sciences, biomedical research, or healthcare.
                    </li>
                    <li>
                        <strong>Engineering and Technology:</strong> A solid path for those interested in civil, mechanical, or electrical
                        engineering.
                    </li>
                    <li>
                        <strong>Arts and Humanities:</strong> Ideal for creative students passionate about media, design, or literature.
                    </li>
                    <li>
                        <strong>Law and Social Sciences:</strong> For aspiring lawyers, psychologists, or sociologists aiming for global careers.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Eligibility Requirements',
        heading: 'What are the eligibility requirements for foundation programmes?',
        content: (
            <>
                <p>
                    Entry requirements differ by university, but generally, foundation programmes are open to international students who have
                    completed their high school studies but need extra preparation before starting a UK degree.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Academic qualifications:</strong> Completion of high school or equivalent, with solid grades in relevant subjects.
                    </li>
                    <li>
                        <strong>English language proficiency:</strong> Proof through a test like{' '}
                        <Link href="/placeholder" className={linkClass}>
                            IELTS
                        </Link>{' '}
                        (score between 4.5–6.0).
                    </li>
                    <li>
                        <strong>Minimum age:</strong> Usually at least 17 years old at the start of the course.
                    </li>
                    <li>
                        <strong>Visa and immigration:</strong> Valid passport, student visa, and a Confirmation of Acceptance for Studies (CAS).
                    </li>
                </ul>
                <p className="mt-4">
                    Requirements can vary by institution, so always double-check with your chosen university’s website before applying.
                </p>
            </>
        ),
    },
    {
        section: 'Application Process',
        heading: 'What’s the application process for foundation courses?',
        content: (
            <>
                <p>Applying for a foundation programme is straightforward but requires careful planning. Follow these steps to stay on track:</p>
                <ol className="mt-4 list-decimal space-y-2 pl-6">
                    <li>
                        <strong>Choose your course:</strong> Select a programme that matches your goals and field of interest.
                    </li>
                    <li>
                        <strong>Submit your application:</strong> Apply directly to the university or via{' '}
                        <Link href="/placeholder" className={linkClass}>
                            UCAS
                        </Link>
                        .
                    </li>
                    <li>
                        <strong>Interview or assessment:</strong> Some universities may invite you for a short interview or academic evaluation.
                    </li>
                    <li>
                        <strong>Offer and acceptance:</strong> Once accepted, meet any conditions such as language scores or document submission.
                    </li>
                    <li>
                        <strong>Visa and travel:</strong> Apply for your UK student visa and begin planning accommodation and arrival.
                    </li>
                </ol>
                <p className="mt-4">
                    Need help getting started?{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Book a free consultation
                    </Link>{' '}
                    with one of our experts—we’ll walk you through every step, from selecting a course to visa guidance.
                </p>
            </>
        ),
    },
    {
        section: 'Accommodation and Support',
        heading: 'Accommodation and student support',
        content: (
            <>
                <p>
                    Most UK universities provide on-campus housing for foundation students, making your move abroad much smoother. You can pick
                    between single rooms, shared flats, or studio apartments—whatever suits your lifestyle best.
                </p>
                <p className="mt-4">
                    Beyond housing, universities offer orientation sessions, counselling, and international student advisors. You’ll also find
                    cultural adjustment workshops and help with banking, healthcare, or visa paperwork to make settling in easier.
                </p>
            </>
        ),
    },
    {
        section: 'Scholarships',
        heading: 'Scholarships',
        content: (
            <>
                <p>
                    While fewer scholarships exist for foundation courses compared to full degrees, many universities still provide tuition discounts
                    or partial funding for international students showing academic promise.
                </p>
                <p className="mt-4">
                    Awards are often based on merit, financial need, or outstanding school results, helping make your foundation year more affordable
                    and accessible.
                </p>
            </>
        ),
    },
    {
        section: 'Cost of Living',
        heading: 'Cost of living',
        content: (
            <>
                <p>
                    Living costs vary depending on where you study—generally cheaper in northern regions than in London or the South. Common monthly
                    expenses include accommodation, food, transport, and personal spending.
                </p>
                <p className="mt-4">
                    Many universities offer budgeting guidance and part-time work advice so you can manage your finances effectively during your stay.
                    With smart planning, you can live comfortably while focusing on your studies.
                </p>
            </>
        ),
    },
    {
        section: 'Next Steps',
        heading: 'Getting started on your foundation journey',
        content: (
            <>
                <p>
                    Ready to take your first step toward studying in the UK? A foundation course is your gateway to a world-class education and a
                    thriving student experience.
                </p>
                <p className="mt-4">
                    Explore top universities, compare foundation programmes, and{' '}
                    <Link href="/placeholder" className={linkClass}>
                        connect with a counsellor
                    </Link>{' '}
                    to plan your academic future with expert guidance.
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
                            Foundation Courses
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
