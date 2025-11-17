import InputError from '@/components/input-error';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

export function SetPasswordDialog() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('invites.setPassword'));
    };

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Set Password</AlertDialogTitle>
                    <AlertDialogDescription />
                </AlertDialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            required
                            tabIndex={1}
                            autoComplete="current-password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                        </div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="Password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="w-fit">
                            Confirm Password
                        </Button>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
