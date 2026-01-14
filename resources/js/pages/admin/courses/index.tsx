import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseFilter, defaultCourseFilters, useCourseFilters } from '@/hooks/filters/use-course-filters';
import AppLayout from '@/layouts/app-layout';
import CourseActions from '@/pages/admin/courses/actions';
import { courseColumns } from '@/pages/admin/courses/data/columns';
import { DeleteCourseDialog } from '@/pages/admin/courses/delete-dialog';
import FacultyModal from '@/pages/admin/courses/faculty-modal';
import CourseFilters from '@/pages/admin/courses/filters';
import { BreadcrumbItem } from '@/types';
import { Course } from '@/types/course';
import { TableData } from '@/types/table';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Plus } from 'lucide-react';
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

            <main className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-950">
                                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">Courses</span>
                                    <Badge variant="secondary" className="gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                        {courses.total} total
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Courses</h1>
                                <p className="mt-2 text-muted-foreground">Manage course offerings and details</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                            <FacultyModal />
                            <Link href={route('admin.courses.create')}>
                                <Button size='lg' className="gap-2 whitespace-nowrap">
                                    <Plus className="h-4 w-4" />
                                    Add Course
                                </Button>
                            </Link>
                        </div>
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
