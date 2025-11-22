import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Course } from '@/types/course';
import { BookIcon, ChartNoAxesGanttIcon, GraduationCapIcon, HourglassIcon, ImageOff } from 'lucide-react';
import * as React from 'react';

interface CourseCardProps {
    course: Course;
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

export default function CourseCard({ course, className }: CourseCardProps) {
    const textContent = course.contents.find((c) => c.type === 'text')?.paragraph || '';

    return (
        <TooltipProvider>
            <Card
                className={`group flex-col gap-3 overflow-hidden rounded-2xl border pt-0 shadow-sm transition hover:shadow-md sm:flex-row sm:gap-6 sm:pt-6 ${className}`}
            >
                {/* Cover */}
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden sm:h-full sm:w-4/12 sm:pl-4">
                    <SafeImg
                        src={course.cover}
                        alt={`${course.title} cover image`}
                        className="h-full w-fit object-cover shadow-sm transition-transform duration-500 sm:mb-6 sm:aspect-video sm:h-50 sm:rounded-lg sm:border"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-black/20 to-transparent sm:hidden" />
                </div>

                <div className="flex flex-col gap-3 sm:w-8/12">
                    <CardHeader className="gap-2 sm:pl-0">
                        <h3 className="text-xl font-semibold tracking-tight text-wrap">{course.title}</h3>

                        <div className="flex flex-col gap-1 text-sm text-theme-foreground">
                            <div className="flex gap-1.5">
                                <ChartNoAxesGanttIcon className="h-5 w-5" />
                                <h4 className="font-semibold underline underline-offset-2">Overview:</h4>
                            </div>
                            <div className="line-clamp-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: textContent }} />
                        </div>
                    </CardHeader>

                    <div className="mx-6">
                        <Separator />
                    </div>

                    <CardContent className="my-auto grid grid-cols-2 gap-2 sm:pl-0">
                        <div className="col-span-2">
                            <h2 className="text-sm font-semibold">Faculty</h2>
                            <Badge className="rounded-full capitalize">
                                <GraduationCapIcon className="mr-1 h-3.5 w-3.5" /> {course.faculty?.name}
                            </Badge>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold">Degree</h2>
                            <Badge variant="outline" className="rounded-full capitalize">
                                <BookIcon className="mr-1 h-3.5 w-3.5" /> {course.study_level}
                            </Badge>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold">Duration</h2>
                            <Badge variant="outline" className="rounded-full capitalize">
                                <HourglassIcon className="mr-1 h-3.5 w-3.5" /> {course.duration} {course.duration_unit}
                            </Badge>
                        </div>
                    </CardContent>

                    <div className="mx-6">
                        <Separator />
                    </div>

                    <CardFooter className="flex justify-center sm:pl-0">
                        <Button size="sm" variant="secondary" className="w-full rounded-full lg:mx-6">
                            View details
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        </TooltipProvider>
    );
}

// Optional: lightweight skeleton for loading states
export function CourseCardSkeleton() {
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
