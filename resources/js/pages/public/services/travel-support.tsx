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
        heading: 'Travel Support for International Students',
        content:
            'Traveling to study abroad involves careful planning—flights, visas, documents, packing, and arrival logistics. We help you prepare step-by-step so your journey is smooth, safe, and stress-free from departure to campus arrival.',
    },
    {
        section: 'Flight Booking',
        heading: 'Flight Booking & Planning',
        content:
            'Book flights early to secure better rates and preferred routes. Confirm baggage allowances and restrictions. Choose flights that arrive during daytime hours for easier navigation and safer transport. Keep ticket confirmations, booking references, and airline contacts accessible during travel.',
    },
    {
        section: 'Pre-Departure',
        heading: 'Pre-Departure Checklist',
        content:
            'Verify passport validity (6+ months), print visa and CAS/offer letters, and keep digital backups. Pack essential documents separately in hand luggage: passport, visa, admission letters, medical records, and accommodation details. Notify your bank of travel dates to avoid card blocks. Purchase travel insurance covering health, baggage, and trip delays.',
    },
    {
        section: 'Packing',
        heading: 'Packing Smart',
        content:
            'Pack essentials first: documents, medications, adapters, chargers, and weather-appropriate clothing. Check airline baggage limits and customs restrictions for food, liquids, and electronics. Ship bulky items separately if cost-effective. Carry a small amount of local currency for initial expenses like transport and meals.',
    },
    {
        section: 'Arrival',
        heading: 'Airport Pickup & Arrival',
        content: (
            <>
                Many universities offer airport pickup services during peak intake weeks—confirm availability and book in advance. If arranging
                private transport, verify driver credentials and vehicle details. Upon arrival, complete immigration formalities, collect baggage, and
                proceed to your pre-booked{' '}
                <Link href={route('public.services.studentAccommodation')} className="text-theme-secondary hover:underline">
                    accommodation
                </Link>
                . Keep emergency contacts handy.
            </>
        ),
    },
    {
        section: 'First Days',
        heading: 'First Days in a New Country',
        content:
            'Register your address with the university, open a local bank account, and purchase a local SIM card for communication. Familiarize yourself with public transport routes, nearby grocery stores, and campus facilities. Attend orientation sessions to meet peers and learn university policies.',
    },
    {
        section: 'Health',
        heading: 'Health & Safety',
        content:
            'Register with a local GP or health service within the first week. Carry copies of prescriptions and medical records. Understand emergency numbers and locate the nearest hospital. Follow local health guidelines and ensure required vaccinations are up to date.',
    },
    {
        section: 'Documents',
        heading: 'Travel Document Management',
        content:
            'Keep physical and digital copies of all critical documents: passport, visa, insurance, tickets, and university letters. Store backups securely in cloud storage or email them to yourself. Report lost or stolen documents immediately to local authorities and your embassy.',
    },
    {
        section: 'Support',
        heading: 'Ongoing Travel Support',
        content: (
            <>
                Need help with last-minute changes, missed flights, or arrival delays? We guide you through rebooking, contacting airlines, and
                notifying your university. Traveling with family or dependents? We provide tailored checklists and coordination support. Questions?{' '}
                <Link href={route('public.consultation.index')} className="text-theme-secondary hover:underline">
                    Book a consultation
                </Link>{' '}
                for personalized guidance.
            </>
        ),
    },
];

const idFrom = (label: string) => label.split(' ').join('_');

const TravelSupportPage = () => {
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
            <Head title="Travel Support" />

            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt={'travel support'}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <Wrapper className="flex h-72 items-center justify-between bg-accent-foreground/70 backdrop-blur-xs sm:h-100">
                    <div className="flex w-full flex-col items-center gap-2 pt-28 sm:gap-4">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-secondary capitalize sm:text-4xl xl:text-5xl">
                            Travel <span className="text-theme-secondary">Support</span>
                        </h1>
                        <p className="max-w-3xl text-center text-muted/80 sm:text-xl xl:text-2xl">
                            Plan your journey with confidence—from booking flights to arriving safely on campus.
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

export default TravelSupportPage;
