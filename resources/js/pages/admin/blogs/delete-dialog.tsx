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
import { Blog } from '@/types/blog';
import { useForm } from '@inertiajs/react';
import { BookMarkedIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    blog: Blog | null;
    setBlog: (blog: Blog | null) => void;
};

export function DeleteBlogDialog({ blog, setBlog }: Props) {
    const { delete: destroy, processing } = useForm();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (blog) {
            setOpen(true);
        }
    }, [blog]);

    const handleDelete = () => {
        destroy(route('admin.blogs.destroy', blog?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setBlog(null);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this blog?</AlertDialogTitle>

                    <div className="mt-2 mb-4 flex flex-col justify-center border-y py-2">
                        <span>
                            Blog: <span className="font-semibold">{blog?.title}</span>
                        </span>

                        <span className="flex items-center gap-1 text-muted-foreground">
                            <BookMarkedIcon className="size-4" />
                            <p className="text-sm">Faculty of {blog?.date}</p>
                        </span>
                    </div>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setBlog(null)}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" disabled={processing} onClick={handleDelete}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
