import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';
import { BookOpen, Clock, GraduationCap, ImageOff, MoreVertical, SquarePenIcon, Trash2Icon } from 'lucide-react';
import * as React from 'react';

// Helper to render an image with graceful fallback
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
            <FallbackIcon className="h-4 w-4" />
        </div>
    );
}

const CourseMobileRow = ({ course, setCourseModal }: { course: Course; setCourseModal: (course: Course) => void }) => {
    const textSectionsCount = course.contents ? course.contents.filter((c) => c.type === 'text').length : 0;
    const videoSectionsCount = course.contents ? course.contents.filter((c) => c.type === 'video').length : 0;

    return (
        <div className="group relative rounded-lg border bg-background shadow-sm">
            {/* Cover Banner */}
            <div className="relative h-24 w-full bg-muted">
                <SafeImg
                    src={course.cover ? `/storage/${course.cover}` : undefined}
                    alt={`${course.title} cover`}
                    className="h-full w-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-105"
                    fallbackIcon={GraduationCap}
                />
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Icon overlay */}
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border-2 border-background bg-background shadow-md">
                        <GraduationCap className="h-8 w-8 text-muted-foreground" />
                    </div>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="size-8 rounded-full shadow-md">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                            <DropdownMenuLabel>
                                <div className="truncate">{course.title}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('admin.courses.show', course.id)} className="flex items-center gap-2">
                                    <SquarePenIcon className="h-4 w-4" /> <span>Edit Course</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCourseModal(course)} className="flex items-center gap-2 text-destructive">
                                <Trash2Icon className="h-4 w-4" /> <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-3 p-4 pt-10">
                {/* Title and Faculty */}
                <div>
                    <Link
                        href={route('admin.courses.show', course.id)}
                        className="line-clamp-2 text-base font-bold underline-offset-2 hover:underline"
                    >
                        {course.title}
                    </Link>
                    <div className="mt-1 text-xs text-muted-foreground">{course.faculty?.name}</div>
                </div>

                {/* Study Level and Duration */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Study Level</p>
                        <Badge variant="outline" className="mt-1">
                            {course.study_level}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Duration</p>
                        <Badge variant="secondary" className="mt-1">
                            <Clock className="mr-1 h-3 w-3" /> {course.duration}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Content Sections */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{textSectionsCount} sections</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{videoSectionsCount} videos</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseMobileRow;
