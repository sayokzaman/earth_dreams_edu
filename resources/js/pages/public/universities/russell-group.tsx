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
        heading: 'Russell Group Universities in the UK for International Students',
        content: (
            <>
                <p>
                    The Russell Group represents 24 of the United Kingdom’s leading universities, known for research excellence, academic rigour, and
                    impact on global innovation. For international students considering{' '}
                    <Link href="/placeholder" className={linkClass}>
                        studying in the UK
                    </Link>
                    , these universities offer high‑quality education, extensive research opportunities, and a powerful alumni network that extends
                    well beyond graduation.
                </p>
                <p className="mt-4">Here’s what matters and how these institutions can shape your academic and professional journey.</p>
            </>
        ),
    },
    {
        section: 'What is the Russell Group?',
        heading: 'What is the Russell Group?',
        content: (
            <>
                <p>
                    Founded in 1994, the Russell Group is an association of 24 public research universities in the UK. They are distinguished by a
                    commitment to research‑intensive teaching and contributions to advancements across disciplines — from technology and medicine to
                    social sciences and the arts.
                </p>
                <p className="mt-4">
                    These universities share a focus on high‑impact research, investment in state‑of‑the‑art facilities, and ties with industries,
                    policymakers, and global institutions. You’ll find names like Oxford, Cambridge, Imperial College London, and LSE alongside
                    excellent institutions spread across the UK.
                </p>
            </>
        ),
    },
    {
        section: 'Why choose a Russell Group university?',
        heading: 'Why choose a Russell Group university?',
        content: (
            <>
                <p>
                    Russell Group universities are globally respected for teaching quality and the impact of their research — ideal for students who
                    want research‑driven degrees or plan for postgrad/doctoral routes.
                </p>
                <p className="mt-4 font-semibold">Key benefits include:</p>
                <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Academic excellence:</span> Rigorous teaching integrated with cutting‑edge research — learn
                        directly from leaders in the field.
                    </li>
                    <li>
                        <span className="font-semibold">Research opportunities:</span> Strong funding and facilities attract international researchers
                        and industry collaborations; students gain hands‑on experience in labs, data, and fieldwork.
                    </li>
                    <li>
                        <span className="font-semibold">Career & industry links:</span> Deep relationships with finance, engineering, healthcare,
                        tech, media, and more translate to placements, internships, and networking.
                    </li>
                    <li>
                        <span className="font-semibold">Global recognition:</span> Degrees carry serious weight worldwide; alumni networks span the
                        globe.
                    </li>
                </ul>
            </>
        ),
    },
    {
        section: 'Who are the Russell Group universities?',
        heading: 'Who are the Russell Group universities?',
        content: (
            <>
                <p className="font-medium">The Russell Group comprises the following 24 institutions:</p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <ol className="list-decimal space-y-1 pl-6">
                        <li>University of Birmingham</li>
                        <li>University of Bristol</li>
                        <li>University of Cambridge</li>
                        <li>Cardiff University</li>
                        <li>Durham University</li>
                        <li>University of Edinburgh</li>
                        <li>University of Exeter</li>
                        <li>University of Glasgow</li>
                        <li>Imperial College London</li>
                        <li>King’s College London</li>
                        <li>University of Leeds</li>
                        <li>University of Liverpool</li>
                    </ol>
                    <ol start={13} className="list-decimal space-y-1 pl-6">
                        <li>London School of Economics and Political Science (LSE)</li>
                        <li>University of Manchester</li>
                        <li>Newcastle University</li>
                        <li>University of Nottingham</li>
                        <li>University of Oxford</li>
                        <li>Queen Mary University of London</li>
                        <li>Queen’s University Belfast</li>
                        <li>University of Sheffield</li>
                        <li>University of Southampton</li>
                        <li>University College London (UCL)</li>
                        <li>University of Warwick</li>
                        <li>University of York</li>
                    </ol>
                </div>
                <p className="mt-4 text-muted-foreground">
                    Each institution has unique strengths across STEM, medicine, humanities, and social sciences — e.g., Imperial for engineering/tech
                    and LSE for social sciences and economics. Oxford and Cambridge (collectively “Oxbridge”) are renowned for heritage and excellence
                    across a wide range of disciplines.
                </p>
            </>
        ),
    },
    {
        section: 'How to apply',
        heading: 'How do you apply to a Russell Group university?',
        content: (
            <>
                <p>
                    Applications follow standard UK processes. For undergraduates, apply via{' '}
                    <Link href="/placeholder" className={linkClass}>
                        UCAS
                    </Link>
                    . Postgraduate applications are usually made directly to the university.
                </p>
                <p className="mt-4">
                    Because demand is high, entry requirements can be competitive (specific grades, English proficiency, sometimes additional tests or
                    interviews). Start early — spaces fill fast and scholarship deadlines come sooner than you think.
                </p>
            </>
        ),
    },
    {
        section: 'Scholarships & Funding',
        heading: 'What scholarships and funding options are there for international students?',
        content: (
            <>
                <p>
                    Many Russell Group universities offer scholarships and funding to support tuition and living costs. Awards may be merit‑based,
                    need‑based, or field/region‑specific.
                </p>
                <p className="mt-4 font-semibold">Popular scholarship routes:</p>
                <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>
                        <span className="font-semibold">Chevening Scholarships:</span> UK‑government funded awards for outstanding students worldwide.
                    </li>
                    <li>
                        <span className="font-semibold">Commonwealth Scholarships:</span> Full or partial funding for eligible students from
                        Commonwealth countries.
                    </li>
                    <li>
                        <span className="font-semibold">University‑specific awards:</span> Many Russell Group institutions run their own schemes to
                        attract top talent.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Always check the university’s website and international office for current scholarships, requirements, and deadlines.
                </p>
            </>
        ),
    },
    {
        section: 'Career prospects',
        heading: 'What are the career prospects for Russell Group graduates?',
        content: (
            <>
                <p>
                    Graduates benefit from excellent employability and higher‑than‑average earnings compared to many peers from other institutions —
                    thanks to academic quality, industry connections, and active alumni networks.
                </p>
                <ol className="mt-4 list-decimal space-y-3 pl-6">
                    <li>
                        <span className="font-semibold">Higher employment rates:</span> Surveys consistently show strong outcomes within 15 months of
                        graduation, with a higher share employed or in further study.
                    </li>
                    <li>
                        <span className="font-semibold">Increased earnings potential:</span> Russell Group graduates tend to see higher starting and
                        mid‑career salaries — especially in finance, law, engineering, data, and tech.
                    </li>
                    <li>
                        <span className="font-semibold">Pathways to high‑skilled roles:</span> A large proportion move into professional roles across
                        sectors; according to{' '}
                        <Link href="/placeholder" className={linkClass}>
                            the UK’s LEO data
                        </Link>
                        , a significant share are in high‑skilled jobs three years after graduation.
                    </li>
                    <li>
                        <span className="font-semibold">Global recognition:</span> Degrees are well‑regarded by employers worldwide and frequently
                        rank among the best for graduate employability.
                    </li>
                </ol>
                <p className="mt-4">
                    Want tailored advice on suitable courses and entry routes?{' '}
                    <Link href="/placeholder" className={linkClass}>
                        Book a free consultation
                    </Link>{' '}
                    with one of our counsellors.
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

export default RussellGroupPage;
