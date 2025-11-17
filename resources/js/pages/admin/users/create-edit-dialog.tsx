import InputError from '@/components/input-error';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Props = {
    user: User | null;
    setModalData: (user: User | null) => void;
};

const initialData = {
    name: '',
    email: '',
    phone: '',
    roles: [] as string[],
};

const CreateEditUserDialog = ({ user, setModalData }: Props) => {
    const { data, setData, post, patch, processing, reset, setDefaults, clearErrors, errors } = useForm(initialData);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                roles: user.roles ? user.roles.map((role) => role.name) : [],
            });
        }
    }, [user, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = user ? 'patch' : 'post';

        const action = user ? route('admin.users.update', user.id) : route('admin.users.store');

        (method === 'post' ? post : patch)(action, {
            method: method,
            onSuccess: () => {
                setOpen(false);
                setModalData(null);
                reset();
                clearErrors();
                setDefaults(initialData);
            },
        });
    };
    return (
        <Dialog
            open={open || user !== null}
            onOpenChange={(v) => {
                setOpen(v);
                setModalData(null);
                reset();
                clearErrors();
                setDefaults(initialData);
            }}
        >
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">Add New User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new user</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new user.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter the name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                        </Label>

                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter the email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">
                            Phone <span className="text-destructive">*</span>
                        </Label>

                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />

                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="roles">
                            Roles <span className="text-destructive">*</span>
                        </Label>

                        <MultiSelect
                            options={[
                                { label: 'Admin', value: 'admin' },
                                { label: 'Manager', value: 'manager' },
                            ]}
                            value={data.roles}
                            onValueChange={(values) => setData('roles', values)}
                            defaultValue={data.roles}
                            variant={'inverted'}
                        />

                        <InputError message={errors.roles} />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant={'outline'} disabled={processing}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            {user ? 'Update User' : 'Create User'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEditUserDialog;
