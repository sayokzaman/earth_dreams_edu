import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Subject } from '@/types/subject';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Trash2Icon } from 'lucide-react';
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
                <Button variant={'outline'}>
                    <ListIcon className="h-4 w-4" />
                    List Subjects
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:min-w-auto sm:rounded-lg">
                <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogDescription />

                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <Input
                            name="subject_name"
                            value={data.subject_name}
                            onChange={(e) => setData('subject_name', e.target.value)}
                            placeholder="Search or add subject"
                            className="h-10"
                        />

                        <Button>Add</Button>
                    </form>

                    <div className="mt-2">
                        <h1>Available Subjects ({subjects.length})</h1>
                        <ul className="mt-2 flex flex-col gap-2 overflow-y-auto sm:max-h-140">
                            {subjects && subjects.length > 0 ? (
                                subjects.map((subject) => (
                                    <li key={subject.id} className="mr-2 flex items-center justify-between rounded-md border px-4 py-2">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground">Subject Name</p>
                                            <p className="font-bold capitalize">{subject.subject_name}</p>

                                            {/* <div className="mt-2 flex items-center gap-1 text-sm">
                                                <p className="text-xs font-bold text-muted-foreground">Number of Courses: </p>
                                                <p className="text-sm font-bold">{subject.course_count || 0}</p>
                                            </div> */}
                                        </div>

                                        <Button onClick={() => handleDelete(subject.id)} size={'icon'} variant={'destructive'}>
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))
                            ) : (
                                <li className="mt-4 text-center text-sm text-muted-foreground">No subjects found</li>
                            )}
                        </ul>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectModal;
