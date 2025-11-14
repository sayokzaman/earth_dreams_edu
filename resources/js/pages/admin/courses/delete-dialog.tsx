import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { useForm } from '@inertiajs/react';
import { BookMarkedIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    course: Course | null;
    setCourse: (course: Course | null) => void;
};

export function DeleteCourseDialog({ course, setCourse }: Props) {
    const { delete: destroy, processing } = useForm();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (course) {
            setOpen(true);
        }
    }, [course]);

    const handleDelete = () => {
        destroy(route('admin.courses.destroy', course?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setCourse(null);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>

                    <div className="mt-2 mb-4 flex flex-col justify-center border-y py-2">
                        <span>
                            Course: <span className="font-semibold">{course?.title}</span>
                        </span>

                        <span className="flex items-center gap-1 text-muted-foreground">
                            <BookMarkedIcon className="size-4" />
                            <p className="text-sm">Faculty of {course?.faculty?.name}</p>
                        </span>
                    </div>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setCourse(null)}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" disabled={processing} onClick={handleDelete}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
