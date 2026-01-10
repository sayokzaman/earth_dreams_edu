import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/category';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const CategoryModal = () => {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        name: '',
    });

    const [search, setSearch] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route('admin.categories.index'), {
                    params: { search: data.name },
                });
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [search, data.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => {
                setData('name', '');
                setSearch('');
            },
        });
    };

    const handleDelete = (categoryId: number) => {
        destroy(route('admin.categories.destroy', categoryId), {
            onSuccess: () => {
                setSearch('');
                setCategories(categories.filter((category) => category.id !== categoryId));
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <ListIcon className="h-4 w-4" />
                    List Categories
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:min-w-auto sm:rounded-lg">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription />

                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Search or add category"
                            className="h-10"
                        />

                        <Button type="submit">Add</Button>
                    </form>

                    <div className="mt-2">
                        <h1>Available Categories ({categories.length})</h1>
                        <ul className="mt-2 flex flex-col gap-2 overflow-y-auto sm:max-h-140">
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <li key={category.id} className="mr-2 flex items-center justify-between rounded-md border px-4 py-2">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground">Category Name</p>
                                            <p className="font-bold">{category.name}</p>

                                            <div className="mt-2 flex items-center gap-1 text-sm">
                                                <p className="text-xs font-bold text-muted-foreground">Number of Blogs: </p>
                                                <p className="text-sm font-bold">{category.blog_count || 0}</p>
                                            </div>
                                        </div>

                                        <Button onClick={() => handleDelete(category.id)} size={'icon'} variant={'destructive'}>
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))
                            ) : (
                                <li className="mt-4 text-center text-sm text-muted-foreground">No categories found</li>
                            )}
                        </ul>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryModal;
