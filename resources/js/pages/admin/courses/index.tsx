import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { CourseFilter, defaultCourseFilters, useCourseFilters } from '@/hooks/filters/use-course-filters';
import AppLayout from '@/layouts/app-layout';
import CourseActions from '@/pages/admin/courses/actions';
import { courseColumns } from '@/pages/admin/courses/data/columns';
import { DeleteCourseDialog } from '@/pages/admin/courses/delete-dialog';
import FacultyModal from '@/pages/admin/courses/faculty-modal';
import CourseFilters from '@/pages/admin/courses/filters'
import { BreadcrumbItem } from '@/types';
import { Course } from '@/types/course';
import { TableData } from '@/types/table';
import { Head, Link } from '@inertiajs/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    },
];

type Props = {
    courses: TableData<Course>;
    filters: Partial<typeof defaultCourseFilters>;
};

const CourseIndex = ({ courses, filters: incomingFilters }: Props) => {
    const { filters, setFilters } = useCourseFilters(incomingFilters);
    const [deleteModalData, setDeleteModalData] = useState<Course | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />

            <main className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Courses</h2>
                        <p className="text-base text-muted-foreground">
                            Showing results for
                            <span className="ml-1 font-semibold text-foreground">
                                {format(filters.from ? filters.from : startOfMonth(new Date()), 'do MMMM')} -{' '}
                                {format(filters.to ? filters.to : endOfMonth(new Date()), 'do MMMM, yyyy')}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                        <FacultyModal />

                        <Link href={route('admin.courses.create')}>
                            <Button className="w-full sm:w-auto">Add New Course</Button>
                        </Link>
                    </div>
                </div>

                <DataTable<Course, CourseFilter>
                    data={courses}
                    columns={courseColumns}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => setFilters(defaultCourseFilters)}
                    rowId={(course) => course.id}
                    renderActions={(course) => <CourseActions course={course} setCourseModal={(course) => setDeleteModalData(course)} />}
                    storageKey="courseTable"
                >
                    <CourseFilters filters={filters} setFilters={setFilters} />
                </DataTable>
            </main>

            <DeleteCourseDialog course={deleteModalData} setCourse={setDeleteModalData} />
        </AppLayout>
    );
};

export default CourseIndex;
