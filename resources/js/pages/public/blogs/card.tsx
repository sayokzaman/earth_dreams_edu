import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Blog } from '@/types/blog';
import { format } from 'date-fns'
import { CalendarIcon, ChartNoAxesGanttIcon, ImageOff } from 'lucide-react';
import * as React from 'react';

interface BlogCardProps {
    blog: Blog;
    className?: string;
}

// Small helper to render an image with graceful fallback
function SafeImg({
    src,
    alt,
    className,
    fallbackIcon: FallbackIcon = ImageOff,
}: {
    src?: string;
    alt: string;
    className?: string;
    fallbackIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
    const [ok, setOk] = React.useState(true);
    return ok && src ? (
        <img src={src} alt={alt} className={className} onError={() => setOk(false)} loading="lazy" decoding="async" />
    ) : (
        <div className={'flex items-center justify-center bg-muted/40 text-muted-foreground ' + (className ?? '')} role="img" aria-label={alt}>
            <FallbackIcon className="h-6 w-6" />
        </div>
    );
}

export default function BlogCard({ blog, className }: BlogCardProps) {
    const textContent = blog.contents.find((c) => c.type === 'text')?.paragraph || '';

    return (
        <TooltipProvider>
            <Card
                className={`group gap-3 overflow-hidden rounded-2xl border pt-0 shadow-sm transition hover:shadow-md ${className} h-full justify-between`}
            >
                {/* Cover */}
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                    <SafeImg
                        src={blog.cover_img}
                        alt={`${blog.title} cover image`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                        <Badge className="absolute top-2 left-2 text-sm font-bold capitalize" variant={'themeSecondary'}>
                            {blog.type}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="gap-2">
                    <h3 className="text-xl font-semibold tracking-tight text-wrap">{blog.title}</h3>

                    <div className="flex flex-col gap-1 text-sm text-theme-foreground">
                        <div className="flex gap-1.5">
                            <ChartNoAxesGanttIcon className="h-5 w-5" />
                            <h4 className="font-semibold underline underline-offset-2">Overview:</h4>
                        </div>
                        <div className="line-clamp-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: textContent }} />
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-2">
                    <div>
                        <h2 className="text-sm font-semibold">Category</h2>
                        <Badge className="rounded-full capitalize">
                            <CalendarIcon className="mr-1 h-3.5 w-3.5" /> {blog.category}
                        </Badge>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold">Date</h2>
                        <Badge className="rounded-full">
                            <CalendarIcon className="mr-1 h-3.5 w-3.5" /> {format(new Date(blog.date), 'dd MMM yyyy')}
                        </Badge>
                    </div>
                </CardContent>

                <Separator className="mx-6" />

                <CardFooter>
                    <Button size="sm" variant="secondary" className="w-full rounded-full">
                        View details
                    </Button>
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
}

// Optional: lightweight skeleton for loading states
export function UniversityCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl">
            <div className="h-40 w-full animate-pulse bg-muted" />
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                </div>
            </CardContent>
            <Separator className="mx-6" />
            <CardFooter className="flex items-center justify-between">
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="flex gap-2">
                    <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
                </div>
            </CardFooter>
        </Card>
    );
}
