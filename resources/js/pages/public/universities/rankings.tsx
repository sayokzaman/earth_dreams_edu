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
        heading: 'UK University Rankings',
        content: (
            <>
                <p>
                    The United Kingdom is known globally for its outstanding education system, with many universities consistently ranking among the
                    top 100 worldwide. Choosing the right university in the UK is a major decision that can define your academic and professional
                    future. Understanding each university’s strengths helps you find the best match for your goals.
                </p>
            </>
        ),
    },
    {
        section: 'Global Ranking Systems',
        heading: 'What are the UK’s globally recognised ranking systems?',
        content: (
            <>
                <p>
                    When considering{' '}
                    <Link href="/placeholder" className={linkClass}>
                        universities in the UK
                    </Link>
                    , two globally recognised ranking systems provide valuable insights: the QS World University Rankings and the Times Higher
                    Education (THE) World University Rankings.
                </p>
                <p className="mt-4">
                    Both systems evaluate universities across criteria like academic reputation, research output, student-to-faculty ratio, and
                    employer perception. While rankings shouldn’t be your only factor, they’re an important guide during your research.
                </p>
            </>
        ),
    },
    {
        section: 'QS Rankings',
        heading: 'What are the QS World University Rankings?',
        content: (
            <>
                <p>
                    The QS World University Rankings assess universities across six performance indicators — from research quality and academic
                    reputation to employability. UK universities consistently rank among the world’s best for their excellence in education and
                    innovation.
                </p>
                <p className="mt-4">
                    Leading names like the University of Cambridge (#2 globally), University of Oxford (#3), and Imperial College London (#6) have
                    maintained top positions for years due to their groundbreaking research and high-impact teaching.
                </p>
            </>
        ),
    },
    {
        section: 'Times Higher Education Rankings',
        heading: 'What are the Times Higher Education World University Rankings?',
        content: (
            <>
                <p>
                    The Times Higher Education (THE) World University Rankings is another prestigious global system. For 2025, the University of
                    Oxford leads as the world’s #1 university. Cambridge follows in the top 5, with Imperial College London and the London School of
                    Economics (LSE) also highly ranked.
                </p>
                <p className="mt-4">
                    University College London (UCL) and the University of Edinburgh both appear in the global top 20 — proof of the UK’s continued
                    dominance in research and academic influence.
                </p>
            </>
        ),
    },
    {
        section: 'Why Choose a Top-ranked University',
        heading: 'Why choose a top-ranked university in the UK?',
        content: (
            <>
                <p>
                    Studying at a top-ranked UK university means gaining global recognition, research access, and career opportunities that extend far
                    beyond graduation.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Global recognition:</span> UK degrees are highly respected worldwide, especially in finance,
                        law, engineering, and healthcare.
                    </li>
                    <li>
                        <span className="font-semibold">Post-study work visa:</span> Thanks to the{' '}
                        <Link href="/placeholder" className={linkClass}>
                            UK’s post-study work visa
                        </Link>
                        , graduates can stay and work in the UK for up to two years (three for PhDs).
                    </li>
                    <li>
                        <span className="font-semibold">Research opportunities:</span> UK universities lead groundbreaking research across
                        disciplines, welcoming international collaboration.
                    </li>
                    <li>
                        <span className="font-semibold">Career prospects:</span> Extensive links with industries enable internships, placements, and
                        networking opportunities.
                    </li>
                    <li>
                        <span className="font-semibold">Diverse community & cultural experience:</span> Meet people from around the world and explore
                        the UK’s multicultural environment.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'University Types',
        heading: 'What types of universities are there in the UK?',
        content: (
            <>
                <p>The UK offers a diverse mix of universities, each with distinct characteristics and academic focuses. Here’s a quick breakdown:</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Traditional universities:</span> Research-intensive and known for academic excellence across
                        diverse fields.
                    </li>
                    <li>
                        <span className="font-semibold">Metropolitan universities:</span> Located in major cities, these institutions offer
                        career-focused courses and strong industry connections.
                    </li>
                    <li>
                        <span className="font-semibold">Specialist universities:</span> Focused on particular fields like art, medicine, or business.
                    </li>
                    <li>
                        <span className="font-semibold">Campus universities:</span> Found in smaller towns, offering tight-knit communities and
                        on-campus amenities.
                    </li>
                    <li>
                        <Link href="/placeholder" className={linkClass}>
                            Russell Group universities
                        </Link>
                        : 24 leading research institutions like Oxford, Cambridge, and Imperial College London known for academic excellence and
                        global impact.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Cost of Study',
        heading: 'How much does it cost to study at the top UK universities?',
        content: (
            <>
                <p>
                    The{' '}
                    <Link href="/placeholder" className={linkClass}>
                        cost of studying in the UK
                    </Link>{' '}
                    varies depending on your course and university. Tuition fees typically range between £11,400 and £38,000 per year for
                    undergraduate degrees. Medical and specialist programs sit at the higher end.
                </p>
                <p className="mt-4">
                    Postgraduate programs have similar costs, but scholarships and bursaries can significantly reduce expenses. Expect around
                    £12,000–£15,000 per year for accommodation and living costs, depending on location and lifestyle.
                </p>
            </>
        ),
    },
    {
        section: 'Choosing the Right University',
        heading: 'How do you pick the right university for you?',
        content: (
            <>
                <p>While rankings can help narrow your choices, the perfect fit depends on more — your subject, goals, and preferred environment.</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Review university rankings:</span> Check academic reputation, subject performance, and
                        graduate outcomes.
                    </li>
                    <li>
                        <span className="font-semibold">Attend virtual open days:</span> Many universities offer live Q&A sessions with students and
                        faculty.
                    </li>
                    <li>
                        <span className="font-semibold">Read student reviews:</span> Get real insights into campus life and course experiences.
                    </li>
                    <li>
                        <span className="font-semibold">Attend EDEC’s events:</span> These are a great way to explore UK universities and application
                        guidance.
                    </li>
                </ul>
                <p className="mt-4">
                    Still unsure where to start?{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Book a free consultation
                    </Link>{' '}
                    to get personalized help choosing your ideal UK university.
                </p>
            </>
        ),
    },
    {
        section: 'Advantages of Studying in the UK',
        heading: 'What are the advantages of studying in the UK?',
        content: (
            <>
                <p>
                    The UK’s education system is recognised worldwide for its quality, innovation, and diversity. With shorter degree durations (three
                    years for undergraduates and one year for most master’s), international students enjoy efficiency, flexibility, and exposure.
                </p>
                <p className="mt-4">
                    You’ll also experience a vibrant multicultural society, part-time work opportunities, and a globally respected qualification that
                    opens doors to endless career paths.
                </p>
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const RankingsPage = () => {
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

export default RankingsPage;
