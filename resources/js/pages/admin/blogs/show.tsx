import Editor from '@/components/editor';
import ImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn, extractYoutubeUrl } from '@/lib/utils';
import { DeleteBlogDialog } from '@/pages/admin/blogs/delete-dialog';
import { BreadcrumbItem } from '@/types';
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Check, ChevronsUpDown, PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    blog: Blog;
};

type ContentForm = {
    id?: number;
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
};

const initialData = {
    type: 'blog',
    title: '',
    category_id: '',
    cover_img: null as File | null,
    content: [] as ContentForm[],
};

const AdminBlogShow = ({ blog }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blogs',
            href: '/blogs',
        },
        {
            title: blog.title,
            href: `/blogs/${blog.id}`,
        },
    ];

    const [imagePreview, setImagePreview] = useState<string>('');

    const { data, setData, post, processing, errors, reset, clearErrors, setDefaults } = useForm(initialData);

    const [deleteModalData, setDeleteModalData] = useState<Blog | null>(null);

    const isMobile = useIsMobile();

    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(blog.category || null);
    const [open, setOpen] = useState(false);

    const widthRef = useRef<HTMLButtonElement>(null);
    const [contentWidth, setContentWidth] = useState(widthRef.current?.offsetWidth || 0);

    useEffect(() => {
        if (blog) {
            setData('title', blog.title);
            setData('category_id', blog.category?.id.toString() || '');
            setData('cover_img', null);
            setData('content', [
                ...blog.contents.map((content) => ({
                    type: content.type,
                    section: content.section,
                    heading: content.heading,
                    paragraph: content.paragraph,
                    video_url: content.video_url,
                })),
            ]);

            if (blog.cover_img) {
                setImagePreview(`/storage/${blog.cover_img}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (widthRef.current) {
            const width = widthRef.current.offsetWidth;
            setContentWidth(width);
        }
    }, [widthRef.current?.offsetWidth]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route('admin.categories.index'), {
                    params: { search },
                });
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [search]);

    const selectCategory = (categoryId: string) => {
        setSelectedCategory(categories.find((category) => category.id === Number(categoryId)) || null);
        setData('category_id', categoryId);
    };

    const handleAddCategory = async () => {
        try {
            const response = await axios.post(route('admin.categories.store'), { name: search });
            setData('category_id', response.data.category.id);
            setSelectedCategory(response.data.category);
            setSearch('');
            setOpen(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleAddNewSection = () => {
        setData('content', [
            ...data.content,
            {
                type: 'text',
                section: 'Section 1',
                heading: '',
                paragraph: '',
                video_url: '',
            },
        ]);
    };

    const handleSectionChange = (index: number, key: string, value: string) => {
        const processedValue = key === 'video_url' ? extractYoutubeUrl(value) : value;

        setData(
            'content',
            data.content.map((section, i) => (i === index ? { ...section, [key]: processedValue } : section)),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.blogs.update', blog.id), {
            method: 'patch',
            forceFormData: true,
            onSuccess: () => {
                clearErrors();
                reset();
                setDefaults();
                setImagePreview('');
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={blog.title} />
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="border-r pr-2 text-xl font-semibold">{blog.title}</h2>

                            <div className="flex flex-wrap gap-1">
                                <Badge className="capitalize">{'Type: ' + blog.type}</Badge>
                                <Badge className="capitalize">{blog.category?.name}</Badge>
                                <Badge className="capitalize">{format(new Date(blog.date), 'dd MMM yyyy')}</Badge>
                            </div>
                        </div>

                        <p className="text-base text-muted-foreground">Blog #{blog.id}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Blog'}
                        </Button>

                        <Button type="button" variant="destructive" disabled={processing} onClick={() => setDeleteModalData(blog)}>
                            {processing ? 'Deleting...' : 'Delete Blog'}
                        </Button>
                    </div>

                    <DeleteBlogDialog blog={deleteModalData} setBlog={setDeleteModalData} />
                </div>

                <div className="flex w-full flex-col gap-6 sm:flex-row">
                    <div className="sm:w-1/4">
                        <Label htmlFor="type" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Type <span className="text-sm text-red-500">*</span>
                        </Label>
                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                            <SelectTrigger className="bg-muted/60">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="news">News</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    <div className="sm:w-2/4">
                        <Label htmlFor="title" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Blog Title <span className="text-sm text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Title"
                            className="bg-muted/60"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="sm:w-1/4">
                        <Label htmlFor="type" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Category <span className="text-sm text-red-500">*</span>
                        </Label>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    ref={widthRef}
                                    className="h-9 w-full justify-between bg-muted/60"
                                >
                                    <p className="capitalize">{selectedCategory ? selectedCategory.name : 'Select Category'}</p>
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2" style={{ width: contentWidth }}>
                                <Input placeholder="Search category..." className="h-9" value={search} onChange={(e) => setSearch(e.target.value)} />

                                <div className="mt-2 flex flex-col items-center gap-1 border-t pt-2 text-sm">
                                    {categories.length > 0 ? (
                                        categories.map((category) => {
                                            const selected = category.id.toString() === data.category_id;

                                            return (
                                                <button
                                                    key={category.id}
                                                    type="button"
                                                    onClick={() => {
                                                        selectCategory(category.id.toString());
                                                        setOpen(false);
                                                    }}
                                                    className={cn(
                                                        'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors',
                                                        selected
                                                            ? 'bg-accent text-accent-foreground'
                                                            : 'hover:bg-accent/80 hover:text-accent-foreground',
                                                    )}
                                                >
                                                    <span className="font-medium capitalize">{category.name}</span>
                                                    {selected && <Check className="h-4 w-4" />}
                                                </button>
                                            );
                                        })
                                    ) : search === '' ? (
                                        <p className="py-4 text-center text-sm text-muted-foreground">No categories found</p>
                                    ) : (
                                        <Button onClick={handleAddCategory} className="my-1.5 w-fit" type="button">
                                            Category not found. Add this category?
                                        </Button>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <InputError message={errors.category_id} />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-screen">
                    <Label htmlFor="cover-image" className="mb-1 block text-lg font-medium">
                        Cover Image
                    </Label>
                    <ImageInput
                        initialImage={imagePreview} // show existing product image when editing
                        onChange={(file, previewUrl) => {
                            // file + preview from the component
                            setData('cover_img', file); // ✅ Inertia will send this file
                            setImagePreview(previewUrl ?? '');
                        }}
                        aspectClass={isMobile ? 'aspect-[5/2]' : 'aspect-[5/1]'}
                    />
                    <p className="text-sm text-muted-foreground">
                        This image will be used as the cover for your content. For best results, use a high-quality image.
                    </p>
                    <InputError message={errors.cover_img} />
                </div>

                <div>
                    <Label htmlFor="description" className="mb-4 block border-b pb-1.5 text-lg font-medium">
                        Content
                    </Label>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="lg:w-4/12">
                            <Label className="mb-2 block font-medium">
                                Sections <span className="text-sm text-red-500">*</span>
                            </Label>
                            <div className={cn('flex flex-col gap-4', data.content.length > 0 && 'mb-6')}>
                                {data.content.map((content, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <p className="px-2">{index + 1}</p>
                                        <Input
                                            id="section"
                                            type="text"
                                            name="section"
                                            value={content.section}
                                            onChange={(e) => handleSectionChange(index, 'section', e.target.value)}
                                            placeholder="Section Name"
                                            className="w-full bg-muted/60"
                                        />

                                        <Select onValueChange={(value) => handleSectionChange(index, 'type', value)} defaultValue={content.type}>
                                            <SelectTrigger className="w-5/12 bg-muted/60">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Text</SelectItem>
                                                <SelectItem value="video">Video</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                            <Button
                                type="button"
                                onClick={handleAddNewSection}
                                className="h-9 w-full bg-muted/60 hover:bg-muted/80"
                                variant={'outline'}
                            >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add New Section
                            </Button>
                        </div>

                        <div className="flex flex-col items-start justify-center gap-6 lg:w-8/12">
                            {data.content.length > 0 ? (
                                data.content.map((content, index) => {
                                    if (content.type === 'video') {
                                        return (
                                            <div key={index} className="w-full">
                                                <input
                                                    id="video_url"
                                                    type="text"
                                                    name="video_url"
                                                    value={content.video_url}
                                                    onChange={(e) => handleSectionChange(index, 'video_url', e.target.value)}
                                                    placeholder="Paste video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                    className={cn(
                                                        'h-16 w-full border bg-muted/60 px-4 py-2 text-lg focus-visible:ring-0 focus-visible:outline-none',
                                                        content.video_url ? 'rounded-t-md border-b-0' : 'rounded-md',
                                                    )}
                                                />

                                                {content.video_url && (
                                                    <iframe
                                                        width="100%"
                                                        className="aspect-video rounded-b-md"
                                                        src={content.video_url}
                                                        title="YouTube video player"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                    ></iframe>
                                                )}
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={index} className="w-full">
                                            <input
                                                id="heading"
                                                type="text"
                                                name="heading"
                                                value={content.heading ?? ''}
                                                onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                                                placeholder="Section Title"
                                                className="h-16 w-full rounded-t-md rounded-b-none border-x border-t bg-muted/60 px-4 py-2 text-xl focus-visible:ring-0 focus-visible:outline-none"
                                            />

                                            <Editor
                                                key={content.id ?? index}
                                                onChange={(e) => handleSectionChange(index, 'paragraph', e)}
                                                initialHtml={content.paragraph}
                                                className="rounded-t-none bg-muted/60"
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="w-full flex-1 pt-6 text-center text-sm text-muted-foreground">No sections added</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
};

export default AdminBlogShow;
