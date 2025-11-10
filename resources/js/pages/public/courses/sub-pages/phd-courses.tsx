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
        heading: 'PhD Degrees in the UK for International Students',
        content: (
            <>
                <p>
                    The UK is a leading destination for doctoral studies, offering high-quality research programs and world-class academic resources.
                    Completing a PhD in the UK gives you the chance to work with distinguished faculty, access cutting-edge facilities, and develop
                    deep expertise in a diverse and supportive academic environment.
                </p>
                <p className="mt-4">
                    UK PhD programs are globally recognised, and your research can open doors to academic, industry, and research-based careers
                    worldwide. If you’re ready to contribute original research and advance your field, the UK provides a world-renowned platform to do
                    so.
                </p>
            </>
        ),
    },
    {
        section: 'Types of PhD Degrees',
        heading: 'What types of PhD Degrees are available in the UK?',
        content: (
            <>
                <p>
                    UK universities offer flexible doctoral options depending on your research goals, academic background, and career aspirations.
                    Here are the main PhD types you’ll find:
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-6">
                    <li>
                        <span className="font-semibold">Traditional PhD (Doctor of Philosophy):</span>
                        Typically 3–4 years full-time (6–7 part-time). You’ll conduct original research under faculty supervision, culminating in a
                        thesis and a viva voce (oral defence). Best suited for academic or research-intensive career paths.
                    </li>
                    <li>
                        <span className="font-semibold">Professional Doctorate:</span>
                        Usually 3–5 years. Combines academic study with work-based research — common in Education (EdD), Business (DBA), Clinical
                        Psychology (DClinPsy), and Engineering (EngD). Perfect for professionals seeking leadership or applied research roles.
                    </li>
                    <li>
                        <span className="font-semibold">PhD by Publication:</span>
                        Ideal for established researchers with existing published work. Instead of a full thesis, you’ll submit a portfolio of
                        research publications plus a critical commentary linking them together. Often completed within 1–2 years.
                    </li>
                    <li>
                        <span className="font-semibold">Integrated PhD (New Route PhD):</span>
                        Combines one year of taught coursework with three years of research. Provides structured training in research skills,
                        methodology, and subject expertise — ideal if you’re transitioning into a new research field.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    These flexible paths let you match your research focus and background to the right program. Need help choosing?{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Find the program that’s right for you
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        section: 'Entry Requirements',
        heading: 'What are the entry requirements for PhD programs in the UK?',
        content: (
            <>
                <p>
                    Admission standards vary by university and research area, but most UK PhD programs require strong academic preparation and a
                    clearly defined research plan.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic qualifications:</span>A relevant master’s degree (or occasionally a strong
                        undergraduate degree). Some fields, like engineering or social sciences, may have specific prerequisites.
                    </li>
                    <li>
                        <span className="font-semibold">Research proposal:</span>A detailed outline of your intended project, showing originality,
                        feasibility, and its contribution to the field.
                    </li>
                    <li>
                        <span className="font-semibold">English language proficiency:</span>
                        Proof via IELTS or TOEFL, typically with IELTS scores around 6.5–7.0 overall.
                    </li>
                    <li>
                        <span className="font-semibold">Additional materials:</span>
                        Letters of recommendation, CV, and sometimes an interview with a potential supervisor to assess suitability for the project.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Application Process',
        heading: 'How do you apply for PhD programs?',
        content: (
            <>
                <p>
                    The PhD application process in the UK depends on the institution, but the following steps outline the general flow for most
                    doctoral applications:
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Identify your research interests:</span>
                        Define your research area and align it with your academic and career goals.
                    </li>
                    <li>
                        <span className="font-semibold">Find a supervisor:</span>
                        Look for a faculty member whose expertise fits your research focus. Many universities encourage reaching out before applying.
                    </li>
                    <li>
                        <span className="font-semibold">Develop your research proposal:</span>
                        Clearly outline your research question, objectives, methods, and expected outcomes.
                    </li>
                    <li>
                        <span className="font-semibold">Prepare your documents:</span>
                        Include transcripts, proposal, CV, references, and English test scores.
                    </li>
                    <li>
                        <span className="font-semibold">Submit your application:</span>
                        Apply directly through the university’s portal.
                    </li>
                    <li>
                        <span className="font-semibold">Receive an offer:</span>
                        Offers may be conditional or unconditional depending on specific academic criteria.
                    </li>
                    <li>
                        <span className="font-semibold">Acceptance and visa process:</span>
                        Once accepted, apply for your student visa and arrange accommodation. Support teams can guide you through each step.
                    </li>
                </ol>
            </>
        ),
    },
    {
        section: 'Costs and Funding',
        heading: 'How much does a PhD in the UK cost?',
        content: (
            <>
                <p>
                    Pursuing a PhD is a major investment, but UK universities and organizations offer extensive financial aid and scholarship
                    opportunities.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Tuition fees:</span>
                        £15,000 – £25,000 per year for international students (varies by field and university).
                    </li>
                    <li>
                        <span className="font-semibold">Living expenses:</span>
                        £10,000 – £15,000 annually (higher in cities like London).
                    </li>
                    <li>
                        <span className="font-semibold">Funding options:</span>
                        Scholarships, fellowships, and grants are available — especially in STEM and high-impact research areas. Check university and
                        government funding bodies for open opportunities.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Support Services',
        heading: 'What support services are available for international PhD students?',
        content: (
            <>
                <p>
                    UK universities provide comprehensive support systems to help doctoral students excel academically and maintain a balanced
                    lifestyle.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic mentorship:</span>
                        Regular guidance from supervisors and access to specialist resources such as research libraries, labs, and networks.
                    </li>
                    <li>
                        <span className="font-semibold">Career services:</span>
                        Job placements, research partnerships, and professional development workshops designed specifically for PhD candidates.
                    </li>
                    <li>
                        <span className="font-semibold">Well-being and community support:</span>
                        Mental health services, peer networks, and events to help manage stress and connect with fellow researchers.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Accommodation',
        heading: 'What are the accommodation options for PhD students?',
        content: (
            <>
                <p>
                    PhD students can choose between university-affiliated housing or private rentals, depending on their preferences and research
                    location.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">University Housing:</span>
                        On-campus or university-linked apartments, offering a convenient and research-focused environment.
                    </li>
                    <li>
                        <span className="font-semibold">Private Rentals:</span>
                        Off-campus flats or houses shared with other graduate students. Universities often help international students find suitable
                        nearby rentals.
                    </li>
                </ul>
                <p className="mt-4">
                    Many PhD students prefer university housing for its proximity to labs, libraries, and academic support facilities.
                </p>
            </>
        ),
    },
    {
        section: 'Work Opportunities',
        heading: 'What work opportunities are available to PhD students?',
        content: (
            <>
                <p>
                    International PhD students in the UK can work up to 20 hours per week during term time and full-time during holidays. Many take
                    roles as teaching assistants, lab assistants, or research associates within their departments — gaining valuable academic and
                    professional experience.
                </p>
                <p className="mt-3">
                    These opportunities provide not only financial support but also help strengthen your resume and professional network.
                </p>
                <p className="mt-3">
                    Completing a PhD in the UK positions you for success in academia, research, and industry globally.{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Book a free consultation
                    </Link>{' '}
                    to learn how to apply and prepare for your doctoral journey.
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
                            PhD Courses
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
