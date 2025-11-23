import ConsultationForm from '@/components/consultation-form';
import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Blog } from '@/types/blog';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlbumIcon, CalendarClockIcon, CompassIcon, LayoutListIcon, PenToolIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    blog: Blog;
}

const BlogShow = ({ blog }: Props) => {
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
            <Head title="Blogs" />

            <div className="relative">
                <img
                    src={blog.cover_img ? `/storage/${blog.cover_img}` : '/images/blog-placeholder.jpg'}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative z-10 flex h-80 items-end bg-gradient-to-b from-black/10 via-black/40 to-black/90 sm:h-[28rem]">
                    <Wrapper className="w-full justify-between pb-6 sm:flex sm:items-end sm:pb-10">
                        <div className="flex flex-col gap-2 pt-20 sm:gap-4">
                            <div className="flex w-fit items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-muted/70 backdrop-blur-lg">
                                {blog.type === 'blog' ? (
                                    <PenToolIcon className="size-5" />
                                ) : blog.type === 'news' ? (
                                    <CompassIcon className="size-5" />
                                ) : blog.type === 'event' ? (
                                    <CalendarClockIcon className="size-5" />
                                ) : null}
                                <span className="capitalize">{blog.type}</span>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">{blog.title}</h1>

                            <div className="flex flex-wrap gap-2 font-semibold">
                                <div className="rounded-full bg-black/30 backdrop-blur-lg">
                                    <span className="flex w-fit items-center gap-2 rounded-full border border-theme-secondary bg-theme-secondary/5 px-3 py-1 text-xs text-theme-secondary sm:text-sm">
                                        <AlbumIcon className="h-4 w-4" />
                                        <span className="capitalize">Published: {format(new Date(blog.date), 'dd MMM yyyy')}</span>
                                    </span>
                                </div>
                                <div className="rounded-full bg-black/30 backdrop-blur-lg">
                                    <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-500 sm:text-sm">
                                        <LayoutListIcon className="h-4 w-4" />
                                        <span className="capitalize">Category: {blog.category}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button className="mt-2.5 w-fit rounded-3xl font-bold sm:text-base">Enquire Now</Button>
                    </Wrapper>
                </div>
            </div>

            <Wrapper className="relative flex flex-col py-12 md:flex-row">
                <ul className="top-24 flex w-full flex-col gap-2 self-start border-b pb-6 text-muted-foreground md:sticky md:mr-6 md:w-3/12 md:border-0 md:py-2">
                    <li>
                        <p className="border-b pb-2 text-center font-semibold text-theme-foreground md:text-start">Table of Content</p>
                    </li>
                    {blog.contents.map((content, idx) => {
                        return (
                            <li key={idx}>
                                <a
                                    href={`#${content.section.split(' ').join('_')}`}
                                    className={cn(
                                        'flex items-center gap-2 px-2 py-2 transition-colors',
                                        activeId === content.section.split(' ').join('_')
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

                <div className="md:w-2/3 md:border-l md:pl-6">
                    {blog?.contents.map((content, index) =>
                        content.type === 'text' ? (
                            <section
                                key={index}
                                id={content.section.split(' ').join('_')}
                                className={cn(
                                    'section-anchor',
                                    index === blog.contents.length - 1 ? '' : 'border-b',
                                    index === 0 ? 'py-10 md:pt-0 md:pb-10' : 'py-10',
                                )}
                            >
                                <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                <h1 className="bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                                    {content.heading}
                                </h1>

                                <div dangerouslySetInnerHTML={{ __html: content.paragraph }} className="leading-loose text-theme-foreground"></div>
                            </section>
                        ) : content.type === 'video' ? (
                            <section
                                key={index}
                                id={content.section.split(' ').join('_')}
                                className={cn('section-anchor', index === blog.contents.length - 1 ? '' : 'border-b')}
                            >
                                <iframe
                                    className="my-8 aspect-video w-full md:my-0 md:px-8 md:py-10"
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

export default BlogShow;
