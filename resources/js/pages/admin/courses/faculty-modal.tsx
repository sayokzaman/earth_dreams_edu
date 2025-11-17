import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Faculty } from '@/types/faculty';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const FacultyModal = () => {
    const { data, setData, post } = useForm({
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <ListIcon className="h-4 w-4" />
                    List Faculties
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:min-w-auto sm:rounded-lg">
                <DialogHeader>
                    <DialogTitle>Add New Faculty</DialogTitle>
                    <DialogDescription />

                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Search or add faculty"
                            className="h-10"
                        />

                        <Button>Add</Button>
                    </form>

                    <div className="mt-2">
                        <h1>Available Faculties ({faculties.length})</h1>
                        <ul className="mt-2 flex flex-col gap-2 overflow-y-auto sm:max-h-140">
                            {faculties && faculties.length > 0 ? (
                                faculties.map((faculty) => (
                                    <li key={faculty.id} className="mr-2 rounded-md border px-4 py-2 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground">Faculty Name</p>
                                            <p className="font-bold">{faculty.name}</p>

                                            <div className="mt-2 flex items-center gap-1 text-sm">
                                                <p className="text-xs font-bold text-muted-foreground">Number of Courses: </p>
                                                <p className="text-sm font-bold">{faculty.course_count || 0}</p>
                                            </div>
                                        </div>

                                        <Button size={'icon'} variant={'destructive'}>
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))
                            ) : (
                                <li className="mt-4 text-center text-sm text-muted-foreground">No faculties found</li>
                            )}
                        </ul>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FacultyModal;
