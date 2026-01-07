import StudentReviews from '@/components/student-review';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type SectionItem = {
    section: string;
    heading: string;
    content: React.ReactNode;
};

const sections: SectionItem[] = [
    {
        section: 'Overview',
        heading: 'Offices & Contacts',
        content:
            'Reach us online or at one of our regional offices. We respond quickly and keep communication clear so you’re supported at every step. During peak intakes we extend hours and acknowledge queries promptly while working through tickets in order.',
    },
    {
        section: 'Headquarters',
        heading: 'Headquarters',
        content:
            'Head Office: United Kingdom. Visits by appointment recommended so the right counselor is available. Please carry required personal documents.',
    },
    {
        section: 'Regional Offices',
        heading: 'Regional Offices',
        content:
            'We operate regional support hubs in Dhaka, Bangladesh. Contact us to confirm counselor availability before visiting. Walk‑ins are welcome when capacity allows—appointments are prioritised.',
    },
    {
        section: 'Contact Channels',
        heading: 'Contact Channels',
        content: (
            <>
                Email:{' '}
                <a className="text-theme-secondary hover:underline" href="mailto:support@earthdreamsedu.com">
                    support@earthdreamsedu.com
                </a>{' '}
                · Web:{' '}
                <a className="text-theme-secondary hover:underline" href="/">
                    www.earthdreamsedu.com
                </a>{' '}
                · Consultation:{' '}
                <Link href={route('public.consultation.index')} className="text-theme-secondary hover:underline">
                    Book now
                </Link>{' '}
                · Social: Facebook · Instagram · LinkedIn · X
            </>
        ),
    },
    {
        section: 'Support Hours',
        heading: 'Support Hours',
        content:
            'Standard response within 1–2 business days. For peak seasons (intakes), allow extra time; we acknowledge promptly and provide expected resolution windows. For deadline‑critical issues, mark the subject accordingly.',
    },
    {
        section: 'Escalation',
        heading: 'Emergency & Escalation',
        content:
            'For urgent application or visa issues, write “URGENT” in the email subject and include your full name, application ID, and deadline. We triage such requests immediately and confirm the next steps and responsible contact.',
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const OfficesPage = () => {
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
            <Head title="Offices & Contacts" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'offices and contacts'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            Our Offices <span className="text-theme-secondary">& Contacts</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Reach us quickly through the channels that suit you.
                        </p>
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
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

export default OfficesPage;
