import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
                <Button variant={'outline'} size="lg" className="gap-2">
                    <ListIcon className="h-4 w-4" />
                    Manage Categories
                </Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-screen overflow-auto rounded-none sm:h-auto sm:max-w-2xl sm:min-w-auto sm:rounded-lg">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg border bg-muted p-2">
                            <ListIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">Category Management</DialogTitle>
                            <p className="text-sm text-muted-foreground">Add and organize categories for blog posts.</p>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">Manage blog categories</DialogDescription>

                    <div className="space-y-6">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-3 text-sm font-medium">Add new category</h3>
                            <form className="flex gap-2" onSubmit={handleSubmit}>
                                <Input
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Technology, Education..."
                                    className="h-10 bg-background"
                                />
                                <Button type="submit" className="h-10 px-6">
                                    Add
                                </Button>
                            </form>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">All categories</h3>
                                <p className="text-xs text-muted-foreground">{categories.length} total</p>
                            </div>
                            <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-auto pr-1">
                                {categories && categories.length > 0 ? (
                                    categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className="group flex items-center justify-between rounded-lg border bg-background p-3 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                                    <ListIcon className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm leading-none font-medium">{category.name}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {category.blog_count || 0} blog{category.blog_count !== 1 ? 's' : ''}
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
                                                            <h4 className="font-semibold">Delete category?</h4>
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                This will permanently remove "{category.name}".
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => handleDelete(category.id)}
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
                                        <p className="text-sm text-muted-foreground">No categories found</p>
                                        <p className="mt-1 text-xs text-muted-foreground">Add your first category above</p>
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

export default CategoryModal;
