import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { cn } from '@/lib/utils';
import { Blog } from '@/types/blog';
import { Head } from '@inertiajs/react';
import { Share2Icon } from 'lucide-react';
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

                <div className="flex h-72 flex-col items-end justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-100 sm:flex-row">
                    <Wrapper>
                        <div className="flex justify-between py-12">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold text-secondary capitalize sm:text-3xl">{blog.title}</h1>

                                <div className="flex gap-2">
                                    <Badge variant={'secondary'} className="text-sm font-semibold">
                                        Published : {blog.date.split(' ')[0]}
                                    </Badge>
                                    <Badge variant={'secondary'} className="text-sm font-semibold">
                                        Category : {blog.category}
                                    </Badge>
                                </div>
                            </div>

                            <Button className="w-fit rounded-3xl font-bold sm:text-base">
                                <Share2Icon className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
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
        </AppPublicLayout>
    );
};

export default BlogShow;
