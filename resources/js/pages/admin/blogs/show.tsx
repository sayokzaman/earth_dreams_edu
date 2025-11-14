import Editor from '@/components/editor';
import CoverImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Blog } from '@/types/blog';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    category: '',
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

    const isMobile = useIsMobile();

    useEffect(() => {
        if (blog) {
            setData('title', blog.title);
            setData('category', blog.category);
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
        setData(
            'content',
            data.content.map((section, i) => (i === index ? { ...section, [key]: value } : section)),
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
                                <Badge className="capitalize">{blog.category}</Badge>
                                <Badge className="capitalize">{format(new Date(blog.date), 'dd MMM yyyy')}</Badge>
                            </div>
                        </div>

                        <p className="text-base text-muted-foreground">Blog #{blog.id}</p>
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Blog'}
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-6">
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
                        <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                            <SelectTrigger className="bg-muted/60">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="courses">Courses</SelectItem>
                                <SelectItem value="travel">Travel</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category} />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-screen">
                    <Label htmlFor="cover-image" className="mb-1 block text-lg font-medium">
                        Cover Image
                    </Label>
                    <CoverImageInput
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

                    <div className="flex flex-col lg:flex-row gap-6">
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

                        <div className="flex lg:w-8/12 flex-col items-start justify-center gap-6">
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
