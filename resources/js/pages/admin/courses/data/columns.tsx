import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';
import { BookMarkedIcon, BookOpen, Clock3, Film, GraduationCap } from 'lucide-react';

export const courseColumns: GenericColumnDef<Course>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (course) => <span className="pl-3 font-semibold text-muted-foreground">#{course.id}</span>,
    },
    {
        key: 'title',
        label: 'Course Title',
        sortable: true,
        align: 'start',
        render: (course) => (
            <Link href={route('admin.courses.show', course.id)} className="group flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-200">
                    <GraduationCap className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate font-semibold text-foreground transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-300">
                        <TextWithBreaks text={course.title} isLink />
                    </span>
                    <span className="text-xs text-muted-foreground">ID: {course.id}</span>
                </div>
            </Link>
        ),
    },
    {
        key: 'faculty',
        label: 'Faculty',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center gap-2 pl-2.5">
                <BookMarkedIcon className="h-4 w-4 text-purple-600" />
                <span className="font-medium capitalize">{course.faculty?.name}</span>
            </div>
        ),
    },
    {
        key: 'study_level',
        label: 'Study Level',
        sortable: false,
        align: 'center',
        render: (course) => (
            <div className="flex items-center justify-center">
                <Badge
                    className="rounded-full px-3 py-1 font-semibold capitalize shadow"
                    variant={
                        course.study_level === 'undergraduate'
                            ? 'rose'
                            : course.study_level === 'masters'
                              ? 'orange'
                              : course.study_level === 'foundation'
                                ? 'violet'
                                : course.study_level === 'doctorate'
                                  ? 'blue'
                                  : 'green'
                    }
                >
                    {course.study_level}
                </Badge>
            </div>
        ),
    },
    {
        key: 'contents',
        label: 'Sections',
        sortable: true,
        align: 'center',
        render: (course) => (
            <div className="flex items-center justify-center gap-3">
                <Badge className="rounded-full border border-purple-200 bg-purple-50 font-semibold text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-200">
                    Total: {course.content_count || 0}
                </Badge>
                <div className="flex gap-2 border-l border-border pl-3">
                    <Badge variant="outline" className="gap-1.5 rounded-lg font-semibold">
                        <BookOpen className="h-3 w-3" /> {course.text_section_count || 0}
                    </Badge>
                    <Badge variant="outline" className="gap-1.5 rounded-lg font-semibold">
                        <Film className="h-3 w-3" /> {course.video_section_count || 0}
                    </Badge>
                </div>
            </div>
        ),
    },
    {
        key: 'duration_months',
        label: 'Duration',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center gap-2 pl-2.5 text-sm font-medium">
                <Clock3 className="h-4 w-4 text-purple-600" />
                <span className="capitalize">
                    {course.duration} {course.duration_unit}
                </span>
            </div>
        ),
    },
];
