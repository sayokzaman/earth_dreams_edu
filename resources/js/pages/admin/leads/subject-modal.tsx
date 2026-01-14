import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Subject } from '@/types/subject';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Plus, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const SubjectModal = () => {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        subject_name: '',
    });

    const [search, setSearch] = useState('');

    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(route('admin.subjects.index'), {
                    params: { search: data.subject_name },
                });
                setSubjects(response.data.subjects);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [search, data.subject_name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.subjects.store'), {
            onSuccess: () => {
                setData('subject_name', '');
                setSearch('');
            },
        });
    };

    const handleDelete = (subjectId: number) => {
        destroy(route('admin.subjects.destroy', subjectId), {
            onSuccess: () => {
                setSearch('');
                setSubjects(subjects.filter((subject) => subject.id !== subjectId));
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} size="lg" className="gap-2">
                    <ListIcon className="h-4 w-4" />
                    Manage Subjects
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:max-w-2xl sm:min-w-auto sm:rounded-lg">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg border bg-muted p-2">
                            <ListIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">Subject Management</DialogTitle>
                            <p className="text-sm text-muted-foreground">Add and organize subjects for courses and leads.</p>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">Manage course subjects</DialogDescription>

                    <div className="space-y-6">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-3 text-sm font-medium">Add new subject</h3>
                            <form className="flex gap-2" onSubmit={handleSubmit}>
                                <Input
                                    name="subject_name"
                                    value={data.subject_name}
                                    onChange={(e) => setData('subject_name', e.target.value)}
                                    placeholder="e.g. Computer Science, Engineering..."
                                    className="h-10 bg-background"
                                />
                                <Button type="submit" className="h-10 px-6">
                                    <Plus className="h-4 w-4" />
                                    Add
                                </Button>
                            </form>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">All subjects</h3>
                                <p className="text-xs text-muted-foreground">{subjects.length} total</p>
                            </div>
                            <ul className="flex flex-col gap-2 overflow-y-auto pr-1 sm:max-h-[400px]">
                                {subjects && subjects.length > 0 ? (
                                    subjects.map((subject) => (
                                        <li
                                            key={subject.id}
                                            className="group flex items-center justify-between rounded-lg border bg-background p-3 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                                    <ListIcon className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm leading-none font-medium capitalize">{subject.subject_name}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">ID: {subject.id}</p>
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
                                                            <h4 className="font-semibold">Delete subject?</h4>
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                This will permanently remove "{subject.subject_name}".
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => handleDelete(subject.id)}
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
                                        <p className="text-sm text-muted-foreground">No subjects found</p>
                                        <p className="mt-1 text-xs text-muted-foreground">Add your first subject above</p>
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

export default SubjectModal;
