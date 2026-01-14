import ConsultationForm from '@/components/consultation-form';
import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Course } from '@/types/course';
import { Head } from '@inertiajs/react';
import { BookMarkedIcon, GraduationCapIcon, HourglassIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    course: Course;
};

const CourseShowPage = ({ course }: Props) => {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -60% 0px', // top offset = header height
                threshold: 0.001, // ↓ lower threshold catches small sections
            },
        );

        const sections = document.querySelectorAll('.section-anchor');
        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    return (
        <AppPublicLayout>
            <Head title={course?.title} />

            <div className="relative">
                <img src={`/storage/${course?.cover}`} alt={course?.title} className="absolute inset-0 h-full w-full object-cover" />

                <div className="relative z-10 flex h-80 items-end bg-gradient-to-b from-black/10 via-black/40 to-black/90 sm:h-[28rem]">
                    <Wrapper className="w-full justify-between pb-6 sm:flex sm:items-end sm:pb-10">
                        <div className="flex flex-col gap-2 pt-20 sm:gap-4">
                            <div className="flex w-fit items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-lg">
                                <BookMarkedIcon className="h-5 w-5 text-muted/70" />
                                <span className="text-sm font-semibold text-muted/70">Faculty of {course?.faculty?.name}</span>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">{course?.title}</h1>

                            <div className="flex flex-wrap gap-2 font-semibold">
                                <div className="rounded-full bg-black/30 backdrop-blur-lg">
                                    <span className="flex w-fit items-center gap-2 rounded-full border border-theme-secondary bg-theme-secondary/5 px-3 py-1 text-xs text-theme-secondary sm:text-sm">
                                        <GraduationCapIcon className="h-4 w-4" />
                                        <span className="capitalize">Degree: {course?.study_level}</span>
                                    </span>
                                </div>
                                <div className="rounded-full bg-black/30 backdrop-blur-lg">
                                    <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-500 sm:text-sm">
                                        <HourglassIcon className="h-4 w-4" />
                                        <span className="capitalize">
                                            Duration: {course?.duration} {course?.duration_unit}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button className="mt-2.5 w-fit rounded-3xl font-bold sm:text-base">Enquire Now</Button>
                    </Wrapper>
                </div>
            </div>

            <Wrapper className="relative flex flex-col py-12 sm:flex-row">
                <ul className="top-24 flex w-full flex-col gap-2 self-start border-b pb-6 text-muted-foreground md:sticky md:mr-6 md:w-3/12 md:border-0 md:py-2">
                    <li>
                        <p className="border-b pb-2 text-center font-semibold text-theme-foreground md:text-start">Table of Content</p>
                    </li>
                    {course?.contents?.map((content, idx) => {
                        const id = idFrom(content.section);
                        return (
                            <li key={idx}>
                                <a
                                    href={`#${content.section.split(' ').join('_')}`}
                                    className={cn(
                                        'flex items-center gap-2 px-2 py-2 transition-colors',
                                        activeId === id
                                            ? 'border-l-4 border-theme bg-muted/40 font-semibold text-theme'
                                            : 'hover:bg-muted/30 hover:text-theme-foreground',
                                    )}
                                >
                                    {content.section}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="sm:w-9/12 sm:border-l sm:pl-12">
                    {course?.contents?.map((content, index) => (
                        <>
                            <section
                                key={index}
                                id={content.section.split(' ').join('_')}
                                className={cn(
                                    'section-anchor text-theme-foreground',
                                    course?.contents && index === course?.contents?.length - 1 ? '' : 'border-b',
                                    index === 0 ? 'py-10 md:pt-0 md:pb-10' : 'py-10',
                                )}
                            >
                                {content.type === 'text' ? (
                                    <>
                                        <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                                            {content.heading}
                                        </h2>
                                        <div className="mt-4" dangerouslySetInnerHTML={{ __html: content.paragraph }} />{' '}
                                    </>
                                ) : (
                                    <iframe
                                        className="aspect-video w-full"
                                        src={content.video_url}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                )}
                            </section>
                        </>
                    ))}
                </div>
            </Wrapper>

            <Wrapper className="border-t py-12">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <h1 className="text-center text-3xl font-extrabold tracking-tight capitalize drop-shadow-sm sm:text-4xl">
                        Book Your <span className="text-theme-accent/90">Free</span> <span className="text-theme-secondary/90">Consultation</span>{' '}
                        Today
                    </h1>

                    <p className="max-w-3xl text-center text-theme-foreground sm:text-xl">
                        Get personalized guidance from our expert consultants. Whether you&apos;re exploring study options or need help with
                        applications, we&apos;re here to assist you every step of the way.
                    </p>
                </div>

                <ConsultationForm />
            </Wrapper>
        </AppPublicLayout>
    );
};

export default CourseShowPage;

const idFrom = (label: string) => label.split(' ').join('_');
