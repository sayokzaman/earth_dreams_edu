import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils'
import { University } from '@/types/university';
import { Head } from '@inertiajs/react';
import { BookmarkCheckIcon, ChartNoAxesColumn, GraduationCapIcon, LandmarkIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    university: University;
};

const UniversityShowPage = ({ university }: Props) => {
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
            <Head title="Universities" />

            <div className="relative">
                <img src={`/storage/${university?.cover}`} alt={university?.name} className="absolute inset-0 h-full w-full object-cover" />

                <Wrapper className="flex h-72 flex-col justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-120 sm:flex-row sm:items-center sm:pt-20">
                    <div className="flex flex-col gap-2 pt-20 sm:gap-4">
                        <img src={`/storage/${university?.logo}`} className="h-14 w-fit sm:h-28" />
                        <h1 className="text-2xl font-bold text-secondary capitalize sm:text-3xl">{university?.name}</h1>
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-6 w-6 text-muted/70" />
                            <span className="font-semibold text-muted/70">{university?.location}</span>
                        </div>

                        <Button className="mt-2.5 w-fit rounded-3xl font-bold sm:text-base">Enquire Now</Button>
                    </div>

                    <div className="relative hidden h-full w-full overflow-hidden rounded-2xl sm:block sm:h-80 sm:w-80">
                        <iframe
                            src={university?.location_url}
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </Wrapper>
            </div>

            <Wrapper className="grid grid-cols-5 gap-4 bg-theme/90 py-6 shadow sm:py-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-fit w-fit rounded-full border">
                        <LandmarkIcon className="h-12 w-12 p-2.5 text-secondary sm:h-16 sm:w-16 sm:p-4" />
                    </div>
                    <div className="text-center">
                        <h6 className="text-sm font-bold text-secondary sm:text-xl">{university?.founded || 'Unknown'}</h6>
                        <p className="text-[10px] font-semibold text-secondary/60 sm:text-sm">Founding Year</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="h-fit w-fit rounded-full border">
                        <BookmarkCheckIcon className="h-12 w-12 p-2.5 text-secondary sm:h-16 sm:w-16 sm:p-4" />
                    </div>
                    <div className="text-center">
                        <h6 className="text-sm font-bold text-secondary sm:text-xl">
                            {university?.guardian_ranking ? `#${university?.guardian_ranking}` : 'Unranked'}
                        </h6>
                        <p className="text-[10px] font-semibold text-secondary/60 sm:text-sm">Guardian Ranking</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="h-fit w-fit rounded-full border">
                        <StarIcon className="h-12 w-12 p-2.5 text-secondary sm:h-16 sm:w-16 sm:p-4" />
                    </div>
                    <div className="text-center">
                        <h6 className="text-sm font-bold text-secondary sm:text-xl">
                            {university?.world_ranking ? `#${university?.world_ranking}` : 'Unranked'}
                        </h6>
                        <p className="text-[10px] font-semibold text-secondary/60 sm:text-sm">THE World Ranking</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="h-fit w-fit rounded-full border">
                        <ChartNoAxesColumn className="h-12 w-12 p-2.5 text-secondary sm:h-16 sm:w-16 sm:p-4" />
                    </div>
                    <div className="text-center">
                        <h6 className="text-sm font-bold text-secondary sm:text-xl">
                            {university?.qs_ranking ? `#${university?.qs_ranking}` : 'Unranked'}
                        </h6>
                        <p className="text-[10px] font-semibold text-secondary/60 sm:text-sm">QS World Ranking</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="h-fit w-fit rounded-full border">
                        <GraduationCapIcon className="h-12 w-12 p-2.5 text-secondary sm:h-16 sm:w-16 sm:p-4" />
                    </div>
                    <div className="text-center">
                        <h6 className="text-sm font-bold text-secondary sm:text-xl">
                            {university?.scholarship ? `${university?.scholarship}` : 'Unknown'}
                        </h6>
                        <p className="text-[10px] font-semibold text-secondary/60 sm:text-sm">Scholarships Available</p>
                    </div>
                </div>
            </Wrapper>

            <Wrapper className="mt-8 flex flex-col gap-2 sm:hidden">
                <div className="relative h-52 w-full overflow-hidden rounded-2xl shadow-lg sm:h-80 sm:w-80">
                    <iframe
                        src={university?.location_url}
                        width="100%"
                        height="100%"
                        allowFullScreen={true}
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </Wrapper>

            <Wrapper className="relative flex flex-col pb-10 sm:flex-row">
                <ul className="top-24 flex flex-col gap-6 self-start py-8 text-muted-foreground sm:sticky sm:w-3/12 sm:gap-4 sm:py-12 sm:text-lg">
                    {university?.contents?.map((content, index) => (
                        <li key={index}>
                            <a
                                href={`#${content.section.split(' ').join('_')}`}
                                className={cn(
                                    activeId === content.section.split(' ').join('_')
                                        ? 'border-l-4 border-theme pl-2 font-semibold text-theme'
                                        : 'hover:text-theme/70',
                                )}
                            >
                                {content.section}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="sm:w-9/12 sm:border-l sm:pl-12">
                    {university?.contents?.map((content, index) =>
                        content.type === 'text' ? (
                            <section
                                key={index}
                                id={content.section.split(' ').join('_')}
                                className={cn('section-anchor flex flex-col gap-6 border-t pt-8 pb-8 tracking-wide', index === 0 && 'sm:pt-12')}
                            >
                                <h1 className="text-3xl font-bold text-theme">{content.heading}</h1>

                                <div dangerouslySetInnerHTML={{ __html: content.paragraph }} className="leading-loose text-theme-foreground"></div>
                            </section>
                        ) : content.type === 'video' ? (
                            <section key={index} id={content.section.split(' ').join('_')} className="section-anchor border-t">
                                <iframe
                                    className="my-8 aspect-video w-full sm:my-0 sm:p-8"
                                    src={content.video_url}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </section>
                        ) : null,
                    )}
                </div>
            </Wrapper>
        </AppPublicLayout>
    );
};

export default UniversityShowPage;
