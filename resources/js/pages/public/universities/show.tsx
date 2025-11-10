import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
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
            <Head title={university?.name} />

            <div className="relative">
                <img src={`/storage/${university?.cover}`} alt={university?.name} className="absolute inset-0 h-full w-full object-cover" />

                <div className="relative z-10 flex h-80 items-end justify-between bg-gradient-to-b from-black/10 via-black/40 to-black/90 sm:h-[28rem]">
                    <Wrapper className="w-fit pr-0 pb-6 sm:pb-14">
                        <div className="flex flex-col gap-2 pt-20 sm:gap-4">
                            <img src={`/storage/${university?.logo}`} className="h-14 w-fit sm:h-28" />

                            <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">{university?.name}</h1>

                            <div className="flex w-fit items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-sm backdrop-blur-lg">
                                <MapPinIcon className="h-5 w-5 text-muted/70" />
                                <span className="font-semibold text-muted/70">Located in {university?.location}</span>
                            </div>
                        </div>

                        <Button className="mt-6 w-fit rounded-3xl font-bold sm:text-base">Enquire Now</Button>
                    </Wrapper>

                    <div className="flex h-full items-center">
                        <div className="relative mr-5 hidden h-80 w-80 items-center overflow-hidden rounded-2xl sm:mr-20 md:flex xl:mr-32 2xl:mr-52">
                            <iframe
                                src={university?.location_url}
                                width="100%"
                                height="100%"
                                allowFullScreen={true}
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Wrapper className="grid grid-cols-5 gap-4 bg-theme/80 py-6 shadow">
                <Stat
                    icon={<LandmarkIcon className="h-12 w-12 p-2.5 text-secondary sm:h-14 sm:w-14 sm:p-4" />}
                    title={university?.founded || 'Unknown'}
                    subtitle="Founding Year"
                />
                <Stat
                    icon={<BookmarkCheckIcon className="h-12 w-12 p-2.5 text-secondary sm:h-14 sm:w-14 sm:p-4" />}
                    title={university?.guardian_ranking ? `#${university.guardian_ranking}` : 'Unranked'}
                    subtitle="Guardian Ranking"
                />
                <Stat
                    icon={<StarIcon className="h-12 w-12 p-2.5 text-secondary sm:h-14 sm:w-14 sm:p-4" />}
                    title={university?.world_ranking ? `#${university.world_ranking}` : 'Unranked'}
                    subtitle="THE World Ranking"
                />
                <Stat
                    icon={<ChartNoAxesColumn className="h-12 w-12 p-2.5 text-secondary sm:h-14 sm:w-14 sm:p-4" />}
                    title={university?.qs_ranking ? `#${university.qs_ranking}` : 'Unranked'}
                    subtitle="QS World Ranking"
                />
                <Stat
                    icon={<GraduationCapIcon className="h-12 w-12 p-2.5 text-secondary sm:h-14 sm:w-14 sm:p-4" />}
                    title={university?.scholarship || 'Unknown'}
                    subtitle="Scholarships Available"
                />
            </Wrapper>

            <Wrapper className="mt-8 flex flex-col gap-2 md:hidden">
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

            <Wrapper className="relative flex flex-col py-12 sm:flex-row">
                <ul className="top-24 flex w-full flex-col gap-2 self-start border-b pb-6 text-muted-foreground md:sticky md:mr-6 md:w-3/12 md:border-0 md:py-2">
                    <li>
                        <p className="border-b pb-2 text-center font-semibold text-theme-foreground md:text-start">Table of Content</p>
                    </li>
                    {university?.contents?.map((content, idx) => {
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
                    {university?.contents?.map((content, index) => (
                        <>
                            <section
                                key={index}
                                id={content.section.split(' ').join('_')}
                                className={cn(
                                    'section-anchor text-theme-foreground',
                                    university?.contents && index === university?.contents?.length - 1 ? '' : 'border-b',
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
        </AppPublicLayout>
    );
};

export default UniversityShowPage;

function Stat({ icon, title, subtitle }: { icon: React.ReactNode; title: string | number; subtitle: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="h-fit w-fit rounded-full border">{icon}</div>
            <div className="text-center">
                <h6 className="text-sm font-extrabold text-gray-300 sm:text-xl">{title}</h6>
                <p className="text-[10px] font-semibold text-gray-400 sm:text-sm">{subtitle}</p>
            </div>
        </div>
    );
}

const idFrom = (label: string) => label.split(' ').join('_');
