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
        heading: 'About EDEC',
        content:
            'EDEC is a student-first education consultancy built to simplify every stage of the study‑abroad journey. We bring together expert advising, transparent information, and practical, on‑the‑ground support so you always know the next right step. From the first conversation to your first week on campus, we focus on fit, clarity, and outcomes—helping you choose programs that match your strengths, assemble strong applications, and transition smoothly to life abroad.',
    },
    {
        section: 'Our Mission',
        heading: 'Our Mission',
        content:
            'We exist to empower students with transparent information, ethical guidance, and hands‑on support so you can make confident decisions about your education and career. Our mission is to remove uncertainty and reduce noise by providing clear timelines, evidence‑based recommendations, and realistic expectations. We advocate for students, uphold compliance, and keep communication prompt and human at every stage.',
    },
    {
        section: 'Our Story',
        heading: 'How EDEC Began',
        content:
            'EDEC was founded by educators and alumni who experienced the challenges of studying abroad firsthand—confusing processes, conflicting advice, and unclear costs. We set out to build a student‑first service that simplifies decisions without overselling outcomes. Today, we partner with universities, pathway providers, and support services to deliver a reliable journey from inquiry to graduation.',
    },
    {
        section: 'What We Do',
        heading: 'What We Do Best',
        content: (
            <>
                We help you shortlist programs, prepare standout applications, and manage timelines across intakes and universities. Our advisors
                review statements, references, and documentation; we guide scholarship search, CAS readiness, and visa filing; and we support
                accommodation, banking, health registration, and travel checklists. You get structured guidance backed by data and delivered with
                personal mentorship.
            </>
        ),
    },
    {
        section: 'Student Successes',
        heading: 'Student Successes',
        content:
            'Thousands of students have secured offers across a range of reputable universities and pathways with our help. We celebrate every visa approval, scholarship win, and first‑day‑on‑campus photo—because your success is why we exist. While results vary by profile, our focus is consistent: honest advising, strong applications, and timely execution.',
    },
    {
        section: 'Partner Network',
        heading: 'Our Partner Universities',
        content:
            'We collaborate with accredited universities and pathway providers to open diverse academic routes for different profiles. Partnerships are built on academic quality, student outcomes, compliance, and responsible recruitment. We perform ongoing due diligence and provide transparent information about options and costs.',
    },
    {
        section: 'Our Advisors',
        heading: 'Meet the Advisors',
        content:
            'Certified counselors, former international students, and career mentors make up our advising team. They combine regional expertise with current policy knowledge and bring empathy to every conversation. Continuous training keeps our guidance accurate, compliant, and up‑to‑date with admissions and visa changes.',
    },
    {
        section: 'How We Support You',
        heading: 'Support at Every Step',
        content: (
            <>
                From shortlisting to arrival, we stay hands‑on. You’ll get webinars, mock visa sessions, document templates, and practical checklists
                for accommodation, banking, and health registration. If issues arise, we help you escalate with institutions and service providers so
                you’re never navigating alone.
            </>
        ),
    },
    {
        section: 'Quality & Ethics',
        heading: 'Quality and Ethics',
        content:
            'We prioritise accuracy, transparency on costs, and realistic timelines. Recommendations are evidence‑based and never pay‑to‑play; advertising meets compliance standards; and applications are handled with care and data security. Where trade‑offs exist, we explain them clearly so you can choose with confidence.',
    },
    {
        section: 'Connect With Us',
        heading: 'Ready to Talk?',
        content: (
            <>
                Have questions about programs, scholarships, CAS, or visas? Our team is here to help.{' '}
                <Link
                    href="/consultation"
                    className="relative font-semibold text-theme-secondary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-theme-secondary after:transition-all hover:after:w-full"
                >
                    Book a consultation
                </Link>{' '}
                and we’ll respond promptly with next steps and timelines.
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const AboutUsPage = () => {
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
            <Head title="About Us" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'about edec'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            <span className="text-theme-accent">About</span> <span className="text-theme-secondary">EDEC</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Get to know the people, mission, and values powering a student-first approach to studying abroad.
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

export default AboutUsPage;
