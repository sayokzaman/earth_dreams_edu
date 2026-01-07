import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string; // TOC label + anchor source
    heading: string; // visible section title
    content: React.ReactNode; // supports JSX (lists, emphasis, etc.)
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Cost of Studying in the UK for International Students',
        content: (
            <>
                Fees and living costs vary a lot by city and course. London skews higher; Northern England, Wales and Scotland can be more affordable.
                Plan for tuition <em>plus</em> rent, food, transport, study materials, healthcare and visa fees.
            </>
        ),
    },
    {
        section: 'Tuition fees by degree level',
        heading: 'Tuition fees by degree level',
        content: (
            <>
                <p className="leading-relaxed">Tuition depends on the university and subject area.</p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>Undergraduate (Bachelor’s):</strong> about £11,400 – £38,000 per year. Specialised programmes like medicine,
                        healthcare and some engineering sit at the top end.
                    </li>
                    <li>
                        <strong>Postgraduate (Master’s):</strong> typically £9,000 – £30,000 a year. Some elite programmes exceed £17,000 while
                        budget-friendlier options start around £13,000.
                    </li>
                    <li>
                        <strong>Doctoral (PhD):</strong> roughly £4,000 – £20,000 per year; research-intensive fields can require extra funding.
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">Tip: Check course pages for exact numbers and any lab, fieldwork or studio fees.</p>
            </>
        ),
    },
    {
        section: 'Accommodation costs',
        heading: 'How much does student accommodation cost in the UK?',
        content: (
            <>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>On-campus halls:</strong> from ~£146 per week depending on room type and city; many bills are included.
                    </li>
                    <li>
                        <strong>Off-campus:</strong> shared houses can be ~£60 per week per person, while private studios are closer to £200 per week.
                    </li>
                </ul>
                <p className="mt-4 leading-relaxed">Most universities help students secure housing and share resources for cheaper options.</p>
            </>
        ),
    },
    {
        section: 'Essential living costs',
        heading: 'What are the essential living costs in the UK?',
        content: (
            <>
                <p className="leading-relaxed">Day-to-day expenses vary by region. As a rough guide:</p>
                <ul className="mt-4 grid list-disc gap-4 pl-6">
                    <li>
                        <strong>Food:</strong> eating out can be up to £25 per meal; ~£50/week groceries if you cook.
                    </li>
                    <li>
                        <strong>Books & study materials:</strong> ~£35/month.
                    </li>
                    <li>
                        <strong>Mobile & internet:</strong> ~£40 – £46/month (student deals and prepaid plans can cut this).
                    </li>
                    <li>
                        <strong>TV licence:</strong> ~£160/year (not needed for streaming-only services like Netflix/Disney+).
                    </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                    Stretch your budget by cooking at home, using student discounts and scouting used textbooks.
                </p>
            </>
        ),
    },
    {
        section: 'Healthcare & insurance',
        heading: 'How much do healthcare and insurance cost?',
        content: (
            <>
                International students pay the <strong>Immigration Health Surcharge (IHS)</strong> to access the NHS: currently £470 per year. Some
                students also choose private health insurance, averaging about £64/month depending on coverage.
            </>
        ),
    },
    {
        section: 'Visa fees',
        heading: 'What are the UK visa fees for international students?',
        content: (
            <>
                The standard <strong>Student visa</strong> application fee is £490. When combined with the IHS, expect visa-related upfront costs of
                roughly <strong>~£960</strong> for the first year.
            </>
        ),
    },
    {
        section: 'Total estimated monthly cost',
        heading: 'What is the total estimated cost of studying in the UK?',
        content: (
            <>
                For one student, typical <strong>living costs</strong> (excluding tuition) run about <strong>£1,000–£1,500 per month</strong>,
                depending on city and lifestyle. Add the relevant tuition band above to project your annual total.
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const StudyInUKCosts = () => {
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
            <Head title="UK Study Costs" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'universities'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-6 sm:pt-40">
                        <h1 className="text-3xl font-bold text-secondary capitalize sm:text-4xl">
                            <span className="text-theme-accent">Cost</span> of Studying in the <span className="text-theme-secondary">UK</span>
                        </h1>
                        <p className="max-w-3xl text-start text-muted/80 sm:text-center sm:text-xl">
                            Studying in the UK opens doors to elite universities and quality education. Your total budget depends on the course,
                            university and where you live. Use this guide to map out tuition, housing, daily living, healthcare and visa costs.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
                {/* Sidebar / TOC */}
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

export default StudyInUKCosts;
