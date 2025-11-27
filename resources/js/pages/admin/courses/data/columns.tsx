import { GenericColumnDef } from '@/components/table/data-table';
import { TextWithBreaks } from '@/components/text-with-breaks';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';
import { BookMarkedIcon } from 'lucide-react';

export const courseColumns: GenericColumnDef<Course>[] = [
    {
        key: 'id',
        label: '#',
        sortable: true,
        align: 'start',
        render: (course) => <span className="pl-4">{course.id}</span>,
    },
    {
        key: 'title',
        label: 'Course Title',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center">
                <Link href={route('admin.courses.show', course.id)} className="pl-3 text-blue-200 capitalize underline-offset-2 hover:underline">
                    <TextWithBreaks text={course.title} isLink />
                </Link>
            </div>
        ),
    },
    {
        key: 'faculty',
        label: 'Faculty',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center pl-3">
                <BookMarkedIcon className="mr-1 h-4" /> <span className="capitalize">{course.faculty?.name}</span>
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
                    className="capitalize"
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
            <div className="flex items-center justify-center gap-1">
                <Badge className="rounded-full font-semibold">Total: {course.content_count || 0}</Badge>
                <div className="flex flex-col gap-1 border-l pl-1">
                    <Badge variant={'outline'} className="rounded-full font-semibold">
                        Text: {course.text_section_count || 0}
                    </Badge>
                    <Badge variant={'outline'} className="rounded-full font-semibold">
                        Video: {course.video_section_count || 0}
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
            <div className="flex items-center">
                <span className="pl-3 capitalize">
                    {course.duration} {course.duration_unit}
                </span>
            </div>
        ),
    },
];
