import CoverImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
    {
        title: 'Create',
        href: `/blogs/create`,
    },
];

type Content = {
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
};

const initialData = {
    cover: null as File | null,
    title: '',
    content: [] as Content[],
};

const CreateBlog = () => {
    const [imagePreview, setImagePreview] = useState<string>('');

    const { data, setData, post, processing, errors, reset, clearErrors, setDefaults } = useForm(initialData);

    const isMobile = useIsMobile();

    const handleAddNewSection = () => {
        setData('content', [
            ...data.content,
            {
                type: 'text',
                section: '',
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

        post(route('blogs.store'), {
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
            <Head title="Blogs" />

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <h2 className="text-xl font-semibold">New Blog</h2>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create New Blog'}
                    </Button>
                </div>

                <div className="flex w-full gap-6">
                    <div className="w-1/4">
                        <Label htmlFor="type" className="mb-1 block text-lg font-medium">
                            Type
                        </Label>
                        <Select defaultValue="blog">
                            <SelectTrigger className="bg-muted/60">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="news">News</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-2/4">
                        <Label htmlFor="title" className="mb-1 block text-lg font-medium">
                            Blog Title
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

                    <div className="w-1/4">
                        <Label htmlFor="type" className="mb-1 block text-lg font-medium">
                            Category
                        </Label>
                        <Select defaultValue="education">
                            <SelectTrigger className="bg-muted/60">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="courses">Courses</SelectItem>
                                <SelectItem value="travel">Travel</SelectItem>
                            </SelectContent>
                        </Select>
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
                            setData('cover', file); // ✅ Inertia will send this file
                            setImagePreview(previewUrl ?? '');
                        }}
                        aspectClass={isMobile ? 'aspect-[5/2]' : 'aspect-[5/1]'}
                    />
                    <p className="text-sm text-muted-foreground">
                        This image will be used as the cover for your content. For best results, use a high-quality image.
                    </p>
                </div>

                <div>
                    <Label htmlFor="description" className="mb-4 block border-b pb-1.5 text-lg font-medium">
                        Content
                    </Label>

                    <div className="flex gap-6">
                        <div className="w-4/12">
                            <Label className="mb-2 block font-medium">Sections</Label>
                            <div className={cn('flex flex-col gap-4', data.content.length > 0 && 'mb-6')}>
                                {data.content.map((content, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <p className="px-2">{index + 1}</p>
                                        <Input
                                            id="section"
                                            type="text"
                                            name="section"
                                            value={content.section || 'Section ' + (index + 1)}
                                            onChange={(e) => handleSectionChange(index, 'section', e.target.value)}
                                            placeholder="Section Name"
                                            className="w-full bg-muted/60"
                                        />

                                        <Select onValueChange={(value) => handleSectionChange(index, 'type', value)} defaultValue="text">
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
                            <Button onClick={handleAddNewSection} className="h-9 w-full bg-muted/60 hover:bg-muted/80" variant={'outline'}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add New Section
                            </Button>
                        </div>

                        <div className="flex w-8/12 flex-col items-start justify-center gap-6">
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
                                                    placeholder="example: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                    className="h-16 w-full rounded-md border bg-muted/60 px-4 py-2 text-xl focus-visible:ring-0 focus-visible:outline-none"
                                                />
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={index} className="w-full">
                                            <input
                                                id="heading"
                                                type="text"
                                                name="heading"
                                                value={content.heading}
                                                onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                                                placeholder="Section Title"
                                                className="h-16 w-full rounded-t-md rounded-b-none border-x border-t bg-muted/60 px-4 py-2 text-xl focus-visible:ring-0 focus-visible:outline-none"
                                            />

                                            <Textarea
                                                id="paragraph"
                                                name="paragraph"
                                                placeholder="Section Paragraph"
                                                value={content.paragraph}
                                                onChange={(e) => handleSectionChange(index, 'paragraph', e.target.value)}
                                                className="rounded-t-none bg-muted/60 focus-visible:ring-0"
                                                rows={8}
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

export default CreateBlog;
