import { GenericColumnDef } from '@/components/table/data-table';
import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';

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
        label: 'Title',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center">
                <Link href={route('admin.courses.show', course.id)} className="pl-3 text-blue-200 capitalize underline-offset-2 hover:underline">
                    {course.title}
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
            <div className="flex items-center">
                <span className="pl-3 capitalize">{course.faculty?.name}</span>
            </div>
        ),
    },
    {
        key: 'study_level',
        label: 'Study Level',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center">
                <span className="pl-3 capitalize">{course.study_level}</span>
            </div>
        ),
    },
    {
        key: 'duration',
        label: 'Duration',
        sortable: true,
        align: 'start',
        render: (course) => (
            <div className="flex items-center">
                <span className="pl-3 capitalize">{course.duration}</span>
            </div>
        ),
    },
];
