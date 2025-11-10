import StudentReviews from '@/components/student-review';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    Briefcase,
    Clock,
    FileCheck2,
    Globe2,
    GraduationCap,
    Hospital,
    Landmark,
    Plane,
    ShieldCheck,
    Users,
    Wallet,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

// ----------------- Content (updated to your original copy) -----------------
const studyPrograms = [
    { qualification: 'Foundation', duration: '6–12 months', gir: "Not applicable (progress to Bachelor's)" },
    { qualification: "Bachelor's Degree (BA, BSc)", duration: '3 years (4 with placement)', gir: 'Stay up to 2 years post-graduation.' },
    { qualification: "Master's (MA, MSc, MBA)", duration: '1–2 years', gir: 'Stay up to 2 years post-graduation.' },
    { qualification: 'Doctor of Philosophy (PhD)', duration: '3–4 years', gir: 'Stay up to 3 years post-graduation.' },
];

const visaRequirements = [
    {
        title: 'Valid Passport',
        desc: 'Your passport must be valid for at least six months beyond your intended studies in the UK.',
    },
    {
        title: 'CAS',
        desc: 'A Confirmation of Acceptance for Studies issued by your chosen UK university or college. It confirms your place in a recognised programme and verifies your ability to cover tuition fees.',
    },
    {
        title: 'Financial Requirements',
        desc: 'You must demonstrate sufficient funds to cover tuition fees and living expenses. Typically shown via bank statements or financial sponsorship documents.',
    },
    {
        title: 'English Language Proficiency',
        desc: 'Meet the required English level, usually through tests like IELTS (often around 6.5 overall) or PTE (around 60), depending on course/university.',
    },
    {
        title: 'Visa Application Form',
        desc: 'Complete the online visa application (GWF00) accurately and submit electronically.',
    },
    {
        title: 'Visa Application Fee',
        desc: 'Pay the required visa application fee as determined by UKVI.',
    },
    {
        title: 'Additional Documents',
        desc: 'Academic transcripts and certificates, proof of previous qualifications, sponsorship letters (if applicable), and medical insurance documents.',
    },
];

const admissionRequirements = [
    {
        q: 'Valid Passport',
        a: 'Your passport must be valid for at least six months beyond your intended stay in the UK.',
    },
    {
        q: 'Application Form',
        a: 'Undergraduate applications are submitted via UCAS. Many postgraduate programmes require direct applications to the university.',
    },
    {
        q: 'Academic Transcripts',
        a: "Official transcripts of your previous education (Class XII for UG; Class XII + Bachelor's for PG).",
    },
    {
        q: 'Proof of English Language Proficiency',
        a: 'Scores from IELTS, TOEFL, or similar accepted tests to demonstrate English language skills as per course requirements.',
    },
    {
        q: 'Personal Statement',
        a: 'A well-written essay outlining your academic goals, interests, and reasons for choosing the programme and university.',
    },
    {
        q: 'Letters of Recommendation',
        a: 'Strong references from teachers, professors, or supervisors to support your application.',
    },
    {
        q: 'Proof of Finances',
        a: 'Evidence of sufficient funds to cover tuition and living expenses during your studies (bank statements or sponsor documents).',
    },
    {
        q: 'Additional Materials (Optional)',
        a: 'Awards, scholarships, publications, relevant work experience, or a portfolio (for creative programmes) to strengthen your profile.',
    },
];

// ----------------- Section registry (pill nav) -----------------
const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'benefits', label: 'Why the UK' },
    { id: 'programs', label: 'Programs' },
    { id: 'visa', label: 'Visa' },
    { id: 'admission', label: 'Admission' },
    { id: 'expenses', label: 'Expenses' },
    { id: 'work', label: 'Work' },
];

const WhyStudyInUK = () => {
    const [active, setActive] = useState<string>('overview');
    const [cityTier, setCityTier] = useState<'london' | 'outside'>('london');
    const visaRef = useRef<HTMLDivElement | null>(null);

    const costs = useMemo(
        () =>
            cityTier === 'london'
                ? [
                      { label: 'Rent', value: '£700–£1,100 /mo' },
                      { label: 'Food', value: '£180–£350 /mo' },
                      { label: 'Transport', value: '£90–£180 /mo' },
                      { label: 'Mobile & Internet', value: '£35–£50 /mo' },
                      { label: 'Books/Materials', value: '£20–£45 /mo' },
                      { label: 'Miscellaneous', value: '£80–£150 /mo' },
                  ]
                : [
                      { label: 'Rent', value: '£450–£800 /mo' },
                      { label: 'Food', value: '£120–£250 /mo' },
                      { label: 'Transport', value: '£40–£110 /mo' },
                      { label: 'Mobile & Internet', value: '£25–£45 /mo' },
                      { label: 'Books/Materials', value: '£15–£35 /mo' },
                      { label: 'Miscellaneous', value: '£60–£120 /mo' },
                  ],
        [cityTier],
    );

    // observe headings to highlight pills
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) setActive(visible.target.id);
            },
            { rootMargin: '-100px 0px -60% 0px', threshold: [0.001, 0.2, 0.4, 0.6] },
        );
        SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <AppPublicLayout>
            <Head title="Study in the UK — Fresh Guide" />

            {/* HERO */}
            <div className="relative">
                <img
                    src={`/images/index_page_covers/university_index.jpg`}
                    alt="study in uk"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex h-80 items-end bg-gradient-to-b from-black/10 via-black/40 to-black/90 sm:h-[28rem]">
                    <Wrapper className="w-full pb-10">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                                <Globe2 className="h-4 w-4" /> International Students
                            </div>
                            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">
                                <span className="text-theme-accent">Study</span> in the <span className="text-theme-secondary">UK</span> — fast,
                                focused, world-class
                            </h1>
                            <p className="mt-3 max-w-2xl text-muted/90 sm:text-lg">
                                Cut through the noise: what to study, how to apply, costs you’ll actually face, and the visa moves that matter.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                                <span className="rounded-full border border-theme-accent bg-theme-accent/30 px-3 py-1 text-theme-accent">
                                    3-year UG
                                </span>
                                <span className="rounded-full border border-theme-secondary bg-theme-secondary/15 px-3 py-1 text-theme-secondary">
                                    1-year PG
                                </span>
                                <span className="rounded-full border border-emerald-600 bg-emerald-500/15 px-3 py-1 text-emerald-600">
                                    Graduate Visa up to 3y
                                </span>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>

            {/* STICKY PILL NAV */}
            <div className="sticky top-20 z-20 border-b bg-theme-foreground/70 backdrop-blur">
                <Wrapper className="bg-theme/20 py-3">
                    <div className="no-scrollbar flex gap-2 overflow-x-auto">
                        {SECTIONS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={cn(
                                    'rounded-full border px-3 py-1 text-sm whitespace-nowrap transition',
                                    active === s.id
                                        ? 'border-white bg-white text-black shadow-lg'
                                        : 'text-white hover:bg-muted hover:text-theme-foreground',
                                )}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </Wrapper>
            </div>

            {/* CONTENT */}
            <Wrapper className="py-12">
                {/* Overview */}
                <section id="overview" className="scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="shadow-sm">
                            <CardContent className="flex items-start gap-4 p-6">
                                <Landmark className="mt-1 h-10 w-10 text-theme" />
                                <div>
                                    <h3 className="font-semibold">World-respected universities</h3>
                                    <p className="text-muted-foreground">
                                        The UK is recognised for top-tier, research-driven learning and a supportive, inclusive academic culture.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardContent className="flex items-start gap-4 p-6">
                                <GraduationCap className="mt-1 h-10 w-10 text-theme" />
                                <div>
                                    <h3 className="font-semibold">Practical to research-heavy</h3>
                                    <p className="text-muted-foreground">
                                        From practical undergraduate programmes to research-focused postgraduate study—there’s a fit for every goal.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardContent className="flex items-start gap-4 p-6">
                                <Users className="mt-1 h-10 w-10 text-theme" />
                                <div>
                                    <h3 className="font-semibold">Diverse, global community</h3>
                                    <p className="text-muted-foreground">
                                        Cultural diversity, rich student life, and strong university support for international students.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Benefits (restored long-form copy) */}
                <section id="benefits" className="mt-16 grid scroll-mt-28 grid-cols-1 gap-8 lg:grid-cols-2">
                    <div>
                        <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                            Why the UK
                        </h2>
                        <div className="mt-4 space-y-4 text-lg leading-8 text-theme-foreground">
                            <p>
                                Studying in the UK offers a wealth of opportunities for personal growth and career advancement. Renowned globally for
                                its world-class universities and innovative education system, the UK provides a solid foundation for academic
                                excellence.
                            </p>
                            <p>
                                Undergraduate programmes typically last three years, while many postgraduate courses finish in one year—delivering
                                both time and cost efficiency. Students also benefit from access to the UK’s National Health Service (NHS) through the
                                Immigration Health Surcharge, ensuring healthcare during their studies.
                            </p>
                            <p>
                                Beyond academics, the UK blends lively cities with picturesque countryside. Students can work up to 20 hours per week
                                during term time and full-time during holidays, gaining experience and financial support. With strong industry
                                connections, post-study work visas like the Graduate Immigration Route, and numerous scholarships, the UK is an ideal
                                destination for global exposure and promising career prospects.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                            Key Facts
                        </h2>

                        <div className="mt-4 grid w-full grid-cols-2 gap-4">
                            <Card className="border-theme/20 shadow-sm">
                                <CardContent>
                                    <div className="flex flex-col items-center gap-2">
                                        <Hospital className="h-8 w-8 text-theme-accent" />
                                        <CardTitle className="mt-2 flex items-center gap-2 font-medium text-theme-foreground">
                                            Undergrad length
                                        </CardTitle>
                                        <h2 className="text-xl font-semibold text-theme">3 years</h2>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-theme/20 shadow-sm">
                                <CardContent>
                                    <div className="flex flex-col items-center gap-2">
                                        <Hospital className="h-8 w-8 text-theme-accent" />
                                        <CardTitle className="mt-2 flex items-center gap-2 font-medium text-theme-foreground">
                                            Postgrad length
                                        </CardTitle>
                                        <h2 className="text-xl font-semibold text-theme">1 year (most)</h2>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-theme/20 shadow-sm">
                                <CardContent>
                                    <div className="flex flex-col items-center gap-2">
                                        <Hospital className="h-8 w-8 text-theme-accent" />
                                        <CardTitle className="mt-2 flex items-center gap-2 font-medium text-theme-foreground">QS/THE</CardTitle>
                                        <h2 className="text-xl font-semibold text-theme">Top-tier presence</h2>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-theme/20 shadow-sm">
                                <CardContent>
                                    <div className="flex flex-col items-center gap-2">
                                        <Hospital className="h-8 w-8 text-theme-accent" />
                                        <CardTitle className="mt-2 flex items-center gap-2 font-medium text-theme-foreground">Culture</CardTitle>
                                        <h2 className="text-xl font-semibold text-theme">Diverse & vibrant</h2>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <ul className="mt-4 grid gap-3 text-base">
                            <li className="flex items-start gap-2">
                                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" /> NHS access via IHS
                            </li>
                            <li className="flex items-start gap-2">
                                <Clock className="mt-1 h-5 w-5 text-blue-600" /> 20 hrs/week in term, full-time in holidays
                            </li>
                            <li className="flex items-start gap-2">
                                <Briefcase className="mt-1 h-5 w-5 text-amber-600" /> Graduate Immigration Route (2–3 years)
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Programs */}
                <section id="programs" className="mt-16 scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                        Programs & Graduation Path
                    </h2>
                    <Card className="mt-6 py-0 shadow-sm">
                        <Table className="rounded-2xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border-r text-center text-base font-semibold text-primary">Qualification</TableHead>
                                    <TableHead className="border-r text-center text-base font-semibold text-primary">Duration</TableHead>
                                    <TableHead className="text-center text-base font-semibold text-primary">
                                        Graduate Immigration Route (GIR)
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studyPrograms.map((p) => (
                                    <TableRow key={p.qualification}>
                                        <TableCell className="border-r text-center">{p.qualification}</TableCell>
                                        <TableCell className="border-r text-center">{p.duration}</TableCell>
                                        <TableCell className="text-center">{p.gir}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </section>

                {/* Visa (vertical stepper, with your full sentences) */}
                <section id="visa" ref={visaRef} className="mt-16 scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                        Visa — what you need
                    </h2>

                    <ol className="mt-6 space-y-6">
                        {visaRequirements.map((v, i) => (
                            <li key={v.title} className="relative pl-10">
                                <span className="absolute top-0 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-theme text-xs font-bold text-white">
                                    {i + 1}
                                </span>
                                <div className="flex items-start gap-3">
                                    <FileCheck2 className="mt-0.5 h-5 w-5 text-theme" />
                                    <div>
                                        <p className="font-semibold">{v.title}</p>
                                        <p className="text-muted-foreground">{v.desc}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Admission (split accordion, with your originals) */}
                <section id="admission" className="mt-16 scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                        Admission
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-theme" /> Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="grid gap-3">
                                    {admissionRequirements.map((r, idx) => (
                                        <AccordionItem key={r.q} value={`adm-${idx}`} className="overflow-hidden rounded-lg border">
                                            <AccordionTrigger className="px-4 hover:bg-muted">{r.q}</AccordionTrigger>
                                            <AccordionContent className="px-4 pt-0 pb-4 text-muted-foreground">{r.a}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Plane className="h-5 w-5 text-theme" /> Quick timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3 text-sm text-muted-foreground">
                                <div className="rounded-lg border p-3">
                                    <p className="font-medium text-theme-foreground">Shortlist courses & universities</p>
                                    <p>Check entry requirements and deadlines. Note scholarship windows.</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="font-medium text-theme-foreground">Prepare documents</p>
                                    <p>Transcripts, IELTS/PTE, personal statement, references, portfolio (if any).</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="font-medium text-theme-foreground">Apply</p>
                                    <p>UG via UCAS; many PG via direct portals. Track statuses and respond fast.</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="font-medium text-theme-foreground">Offer → CAS → Visa</p>
                                    <p>Accept offer, pay deposits, request CAS, then submit your visa application.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Expenses (toggle keeps, copy adjusted) */}
                <section id="expenses" className="mt-16 scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                            Living expenses
                        </h2>
                        <div className="flex items-center gap-2 rounded-full border p-1">
                            <button
                                onClick={() => setCityTier('london')}
                                className={cn(
                                    'rounded-full px-3 py-1 text-sm',
                                    cityTier === 'london' ? 'bg-theme text-white' : 'text-muted-foreground hover:bg-muted',
                                )}
                            >
                                London
                            </button>
                            <button
                                onClick={() => setCityTier('outside')}
                                className={cn(
                                    'rounded-full px-3 py-1 text-sm',
                                    cityTier === 'outside' ? 'bg-theme text-white' : 'text-muted-foreground hover:bg-muted',
                                )}
                            >
                                Outside London
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {costs.map((c) => (
                            <Card key={c.label} className="py-4 shadow-sm">
                                <CardContent className="flex items-center justify-between px-4">
                                    <span className="text-muted-foreground">{c.label}</span>
                                    <span className="font-semibold">{c.value}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="mt-6 border-dashed shadow-none">
                        <CardContent className="flex flex-wrap items-center gap-3 p-4 text-sm text-muted-foreground">
                            <Wallet className="h-4 w-4" />
                            <span>
                                These are living costs only—tuition is separate. Expect roughly £1,000–£1,500 per month in larger cities (London
                                higher), and less in smaller cities/towns.
                            </span>
                        </CardContent>
                    </Card>
                </section>

                {/* Work (restored details) */}
                <section id="work" className="mt-16 scroll-mt-28">
                    <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                    <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                        Work opportunities
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <Briefcase className="h-5 w-5 text-theme" /> Part-time Work
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p>
                                    Maximum of <strong>20 hours/week</strong> for regular students. Maximum of <strong>10 hours/week</strong> for
                                    language centre students. Full-time permitted during holidays.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-theme" /> Post-study Work
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p>
                                    Students completing a Bachelor’s or Master’s programme typically get a <strong>2-year</strong> work visa. PhD
                                    graduates typically get
                                    <strong> 3 years</strong>.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6 bg-gradient-to-r from-theme/20 to-theme-secondary/20">
                        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                            <p className="text-xl font-semibold">Want tailored course & city picks?</p>
                            <p className="max-w-2xl text-muted-foreground">We can help you find the perfect course and city for you.</p>

                            <Link href="/consultation">
                                <Button>
                                    Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>

                {/* Reviews */}
                <div className="mt-16">
                    <StudentReviews />
                </div>
            </Wrapper>
        </AppPublicLayout>
    );
};

export default WhyStudyInUK;
