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
import { University } from '@/types/university';
import { useForm } from '@inertiajs/react';
import { MapPinIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    university: University | null;
    setUniversity: (university: University | null) => void;
};

export function DeleteUniversityDialog({ university, setUniversity }: Props) {
    const { delete: destroy, processing } = useForm();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (university) {
            setOpen(true);
        }
    }, [university]);

    const handleDelete = () => {
        destroy(route('admin.universities.destroy', university?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setUniversity(null);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this university?</AlertDialogTitle>

                    <div className="mt-2 mb-4 flex flex-col justify-center border-y py-2">
                        <span>
                            University: <span className="font-semibold">{university?.name}</span>
                        </span>

                        <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPinIcon className="size-4" />
                            <p className="text-sm">Location: {university?.location}</p>
                        </span>
                    </div>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setUniversity(null)}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" disabled={processing} onClick={handleDelete}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
