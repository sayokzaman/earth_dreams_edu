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
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { MailIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export function DeleteUserDialog({ user, setUser }: Props) {
    const { delete: destroy, processing } = useForm();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setOpen(true);
        }
    }, [user]);

    const handleDelete = () => {
        destroy(route('admin.users.destroy', user?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setUser(null);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>

                    <div className="mt-2 mb-4 flex flex-col justify-center border-y py-2">
                        <span className="text-sm text-muted-foreground">ID: #{user?.id}</span>

                        <span>
                            User: <span className="font-semibold">{user?.name}</span>
                        </span>

                        <span className="mt-1 flex items-center gap-1 text-muted-foreground">
                            <MailIcon className="size-4" />
                            <p className="text-xs">Email: {user?.email}</p>
                        </span>
                    </div>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setUser(null)}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" disabled={processing} onClick={handleDelete}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
