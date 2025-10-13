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

                <div className="flex h-72 flex-col items-end justify-between bg-accent-foreground/40 backdrop-blur-xs sm:h-120 sm:flex-row">
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

            <Wrapper className="relative flex flex-col pb-10 sm:flex-row">
                <ul className="top-24 flex flex-col gap-6 self-start py-8 text-muted-foreground sm:sticky sm:w-3/12 sm:gap-4 sm:py-12 sm:text-lg">
                    {blog?.contents.map((content, index) => (
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
                    {blog?.contents.map((content, index) =>
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

export default BlogShow;
