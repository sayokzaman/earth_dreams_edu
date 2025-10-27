import Editor from '@/components/editor';
import CoverImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn, extractGoogleMapUrl } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { UniversityContent } from '@/types/university';
import { Head, useForm } from '@inertiajs/react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Universities',
        href: '/universities',
    },
    {
        title: 'Create',
        href: `/universities/create`,
    },
];

const initialData = {
    name: '',
    cover: null as File | null,
    logo: null as File | null,
    location: '',
    location_url: '',
    founded: '',
    guardian_ranking: '',
    world_ranking: '',
    qs_ranking: '',
    scholarship: '',
    content: [] as UniversityContent[],
};

const CreateUniversity = () => {
    const [logoPreview, setLogoPreview] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string>('');

    const { data, setData, post, processing, errors, reset, clearErrors, setDefaults } = useForm(initialData);

    const handleAddNewSection = () => {
        setData('content', [
            ...data.content,
            {
                type: 'text',
                section: `Section ${data.content.length + 1}`,
                heading: '',
                paragraph: '',
                video_url: '',
            },
        ]);
    };

    const handleDeleteSection = (index: number) => {
        setData(
            'content',
            data.content.filter((_, i) => i !== index),
        );
    };

    const handleSectionChange = (index: number, key: string, value: string) => {
        setData(
            'content',
            data.content.map((section, i) => (i === index ? { ...section, [key]: value } : section)),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.universities.store'), {
            onSuccess: () => {
                clearErrors();
                reset();
                setDefaults();
                setLogoPreview('');
                setCoverPreview('');
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Create New University" />

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <h2 className="text-xl font-semibold">New University</h2>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create New University'}
                    </Button>
                </div>

                <div className="flex w-full gap-6">
                    <div className="w-1/2">
                        <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Name <span className="text-sm text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="University Name"
                            className="bg-muted/60"
                        />
                        <InputError className="text-xs" message={errors.name} />
                    </div>

                    <div className="w-1/2">
                        <Label htmlFor="location" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Location <span className="text-sm text-red-500">*</span>
                        </Label>
                        <Input
                            id="location"
                            type="text"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Location of the University"
                            className="bg-muted/60"
                        />
                        <InputError className="text-xs" message={errors.location} />
                    </div>
                </div>

                <div>
                    <Label htmlFor="location_url" className="mb-1 flex items-start gap-1 text-lg font-medium">
                        Location embedded URL <span className="text-sm text-red-500">*</span>
                    </Label>
                    <Input
                        id="location_url"
                        type="text"
                        name="location_url"
                        value={data.location_url}
                        onChange={(e) => setData('location_url', extractGoogleMapUrl(e.target.value))}
                        placeholder='e.g. <iframe src="https://www.google.com/maps/embed?"></iframe>"'
                        className="bg-muted/60"
                    />
                    <InputError className="text-xs" message={errors.location_url} />
                </div>

                {data.location_url ? (
                    <div className="relative hidden h-full w-full overflow-hidden rounded-2xl sm:block sm:h-80">
                        <iframe
                            src={data?.location_url}
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                ) : null}

                <div className="flex gap-6">
                    <div className="w-1/4">
                        <Label htmlFor="cover-image" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Logo <span className="text-sm text-red-500">*</span>
                        </Label>
                        <CoverImageInput
                            initialImage={logoPreview} // show existing product image when editing
                            onChange={(file, previewUrl) => {
                                // file + preview from the component
                                setData('logo', file); // ✅ Inertia will send this file
                                setLogoPreview(previewUrl ?? '');
                            }}
                            aspectClass={'aspect-[1/1]'}
                            imageType="logo"
                            recommendation="transparent background."
                        />
                        <InputError className="text-xs" message={errors.logo} />
                    </div>

                    <div className="w-3/4">
                        <Label htmlFor="cover-image" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Cover Image <span className="text-sm text-red-500">*</span>
                        </Label>
                        <CoverImageInput
                            initialImage={coverPreview} // show existing product image when editing
                            onChange={(file, previewUrl) => {
                                // file + preview from the component
                                setData('cover', file); // ✅ Inertia will send this file
                                setCoverPreview(previewUrl ?? '');
                            }}
                        />
                        <InputError className="text-xs" message={errors.cover} />
                    </div>
                </div>

                <div>
                    <Label className="mb-1 block text-lg font-medium">Rankings</Label>
                    <div className="grid grid-cols-5 gap-4 pt-2">
                        <div>
                            <Label className="mb-1 block text-sm font-medium">
                                Founding Year <span className="text-sm text-red-500">*</span>
                            </Label>
                            <Input value={data.founded} onChange={(e) => setData('founded', e.target.value)} className="bg-muted/60" />
                            <InputError className="text-xs" message={errors.founded} />
                        </div>

                        <div>
                            <Label className="mb-1 block text-sm font-medium">Guardian Ranking</Label>
                            <Input
                                value={data.guardian_ranking}
                                onChange={(e) => setData('guardian_ranking', e.target.value)}
                                className="bg-muted/60"
                            />
                            <InputError className="text-xs" message={errors.guardian_ranking} />
                        </div>

                        <div>
                            <Label className="mb-1 block text-sm font-medium">The World Ranking</Label>
                            <Input value={data.world_ranking} onChange={(e) => setData('world_ranking', e.target.value)} className="bg-muted/60" />
                            <InputError className="text-xs" message={errors.world_ranking} />
                        </div>

                        <div>
                            <Label className="mb-1 block text-sm font-medium">QS World Ranking</Label>
                            <Input value={data.qs_ranking} onChange={(e) => setData('qs_ranking', e.target.value)} className="bg-muted/60" />
                            <InputError className="text-xs" message={errors.qs_ranking} />
                        </div>

                        <div>
                            <Label className="mb-1 block text-sm font-medium">Scholarship</Label>
                            <Input value={data.scholarship} onChange={(e) => setData('scholarship', e.target.value)} className="bg-muted/60" />
                            <InputError className="text-xs" message={errors.scholarship} />
                        </div>
                    </div>
                </div>

                <div>
                    <Label htmlFor="description" className="mb-4 block border-b pb-1.5 text-lg font-medium">
                        Content
                    </Label>

                    <div className="flex gap-6">
                        <div className="w-4/12">
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

                                        <Select onValueChange={(value) => handleSectionChange(index, 'type', value)} defaultValue="text">
                                            <SelectTrigger className="w-5/12 bg-muted/60">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Text</SelectItem>
                                                <SelectItem value="video">Video</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button type="button" onClick={() => handleDeleteSection(index)} variant={'destructive'} className="h-9 w-9">
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
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

                            <InputError className="text-xs" message={errors.content} />
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
                                                value={content.heading}
                                                onChange={(e) => {
                                                    handleSectionChange(index, 'heading', e.target.value);
                                                }}
                                                placeholder="Section Title"
                                                className="h-16 w-full rounded-t-md rounded-b-none border-x border-t bg-muted/60 px-4 py-2 text-xl focus-visible:ring-0 focus-visible:outline-none"
                                            />

                                            <Editor
                                                onChange={(e) => handleSectionChange(index, 'paragraph', e)}
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

export default CreateUniversity;
