import { TextWithBreaks } from '@/components/text-with-breaks';
import { ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';
import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';
import { BookMarkedIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';

type Props = {
    course: Course;
    setCourseModal: (course: Course) => void;
};

const CourseActions = ({ course, setCourseModal }: Props) => {
    return (
        <>
            <ContextMenuLabel>
                <div className="flex flex-col gap-1">
                    <TextWithBreaks text={course.title} />
                    <div className="flex gap-1 text-xs text-foreground/75">
                        <BookMarkedIcon className="size-4" /> {course.faculty?.name}
                    </div>
                </div>
            </ContextMenuLabel>

            <ContextMenuSeparator />

            <ContextMenuItem>
                <Link href={route('admin.courses.show', course.id)} className="flex gap-2">
                    <SquarePenIcon className="size-5" /> <span>Edit course</span>
                </Link>
            </ContextMenuItem>

            <ContextMenuItem
                onClick={() => {
                    setCourseModal(course);
                }}
            >
                <span className="flex gap-2 text-destructive">
                    <Trash2Icon className="size-5" /> <span>Delete</span>
                </span>
            </ContextMenuItem>
        </>
    );
};

export default CourseActions;
