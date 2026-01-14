import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Faculty } from '@/types/faculty';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const FacultyModal = () => {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        name: '',
    });

    const [search, setSearch] = useState('');

    const [faculties, setFaculties] = useState<Faculty[]>([]);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get(route('admin.faculties.index'), {
                    params: { search: data.name },
                });
                setFaculties(response.data.faculties);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };

        fetchFaculties();
    }, [search, data.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.faculties.store'), {
            onSuccess: () => {
                setData('name', '');
                setSearch('');
            },
        });
    };

    const handleDelete = (facultyId: number) => {
        destroy(route('admin.faculties.destroy', facultyId), {
            onSuccess: () => {
                setSearch('');
                setFaculties(faculties.filter((faculty) => faculty.id !== facultyId));
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} size="lg" className="gap-2">
                    <ListIcon className="h-4 w-4" />
                    Manage Faculties
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:max-w-2xl sm:min-w-auto sm:rounded-lg">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg border bg-muted p-2">
                            <ListIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">Faculty Management</DialogTitle>
                            <p className="text-sm text-muted-foreground">Add and organize faculties for courses.</p>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">Manage course faculties</DialogDescription>

                    <div className="space-y-6">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-3 text-sm font-medium">Add new faculty</h3>
                            <form className="flex gap-2" onSubmit={handleSubmit}>
                                <Input
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Engineering, Business..."
                                    className="h-10 bg-background"
                                />
                                <Button type="submit" className="h-10 px-6">
                                    Add
                                </Button>
                            </form>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">All faculties</h3>
                                <p className="text-xs text-muted-foreground">{faculties.length} total</p>
                            </div>
                            <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-auto pr-1">
                                {faculties && faculties.length > 0 ? (
                                    faculties.map((faculty) => (
                                        <li
                                            key={faculty.id}
                                            className="group flex items-center justify-between rounded-lg border bg-background p-3 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                                    <ListIcon className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm leading-none font-medium">{faculty.name}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {faculty.course_count || 0} course{faculty.course_count !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        size={'icon'}
                                                        variant={'ghost'}
                                                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <Trash2Icon className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64" align="end">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h4 className="font-semibold">Delete faculty?</h4>
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                This will permanently remove "{faculty.name}".
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => handleDelete(faculty.id)}
                                                                size="sm"
                                                                variant="destructive"
                                                                className="flex-1"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </li>
                                    ))
                                ) : (
                                    <li className="rounded-lg border border-dashed bg-muted/20 py-8 text-center">
                                        <p className="text-sm text-muted-foreground">No faculties found</p>
                                        <p className="mt-1 text-xs text-muted-foreground">Add your first faculty above</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FacultyModal;
