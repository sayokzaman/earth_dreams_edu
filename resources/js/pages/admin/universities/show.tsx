import Editor from '@/components/editor';
import ImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn, extractYoutubeUrl } from '@/lib/utils';
import { DeleteUniversityDialog } from '@/pages/admin/universities/delete-dialog';
import { BreadcrumbItem } from '@/types';
import { University, UniversityContent } from '@/types/university';
import { Head, useForm } from '@inertiajs/react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    university: University;
};

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

const ShowUniversity = ({ university }: Props) => {
    const [logoPreview, setLogoPreview] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string>('');

    const { data, setData, post, processing, errors, reset, clearErrors, setDefaults } = useForm(initialData);

    const [deleteModalData, setDeleteModalData] = useState<University | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Universities',
            href: '/universities',
        },
        {
            title: university.name,
            href: `/universities/${university.id}`,
        },
    ];

    const hydrateFromUniversity = () => {
        setData('name', university.name);
        setData('location', university.location);
        setData('location_url', university.location_url);
        setData('founded', university.founded);
        setData('guardian_ranking', university.guardian_ranking);
        setData('world_ranking', university.world_ranking);
        setData('qs_ranking', university.qs_ranking);
        setData('scholarship', university.scholarship);

        if (university.contents) {
            setData('content', [
                ...university.contents.map((content) => ({
                    type: content.type,
                    section: content.section,
                    heading: content.heading,
                    paragraph: content.paragraph,
                    video_url: content.video_url,
                })),
            ]);
        }

        setCoverPreview(`/storage/${university.cover}`);
        setLogoPreview(`/storage/${university.logo}`);
    };

    useEffect(() => {
        hydrateFromUniversity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        const processedValue = key === 'video_url' ? extractYoutubeUrl(value) : value;

        setData(
            'content',
            data.content.map((section, i) => (i === index ? { ...section, [key]: processedValue } : section)),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.universities.update', university.id), {
            method: 'patch',
            forceFormData: true,
            onSuccess: () => {
                clearErrors();
                reset();
                setDefaults();
                hydrateFromUniversity();
            },
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        clearErrors();
        reset();
        setDefaults();
        hydrateFromUniversity();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={university.name} />

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.12),transparent_20%)]" />
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <p className="text-xs tracking-[0.2em] text-white/70 uppercase">Universities</p>
                            <h2 className="text-2xl font-semibold sm:text-3xl">{university.name}</h2>
                            <p className="text-sm text-white/80">{university.location}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                            >
                                Reset changes
                            </Button>
                            <Button type="button" variant="destructive" disabled={processing} onClick={() => setDeleteModalData(university)}>
                                {processing ? 'Deleting...' : 'Delete'}
                            </Button>
                            <Button type="submit" disabled={processing} className="shadow-lg">
                                {processing ? 'Updating...' : 'Save changes'}
                            </Button>
                            <DeleteUniversityDialog university={deleteModalData} setUniversity={setDeleteModalData} />
                        </div>
                    </div>

                    <div className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7-9 7-9-7z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9l6-4m0 16v-7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase">Founded</p>
                                <p className="font-semibold">{data.founded || '—'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase">Location</p>
                                <p className="font-semibold">{data.location || '—'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v12H4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4 4m12-4l-4 4M8 8h8" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase">Media</p>
                                <p className="font-semibold">{logoPreview && coverPreview ? 'Ready' : 'Pending'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17l-5-5 5-5m6 0l5 5-5 5" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-white/70 uppercase">Sections</p>
                                <p className="font-semibold">{data.content.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Identity</h3>
                                    <p className="text-sm text-muted-foreground">Update the public-facing basics.</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-sm font-medium">
                                        Name
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
                                <div>
                                    <Label htmlFor="location" className="mb-1 flex items-start gap-1 text-sm font-medium">
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="City, Country"
                                        className="bg-muted/60"
                                    />
                                    <InputError className="text-xs" message={errors.location} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="location_url" className="mb-1 flex items-start gap-1 text-sm font-medium">
                                    Location embedded URL
                                </Label>
                                <Input
                                    id="location_url"
                                    type="text"
                                    name="location_url"
                                    value={data.location_url}
                                    onChange={(e) => setData('location_url', e.target.value)}
                                    placeholder="Paste Google Maps embed URL"
                                    className="bg-muted/60"
                                />
                                <InputError className="text-xs" message={errors.location_url} />
                                {data.location_url ? (
                                    <div className="mt-4 overflow-hidden rounded-lg border">
                                        <iframe
                                            src={data?.location_url}
                                            width="100%"
                                            height="320"
                                            allowFullScreen={true}
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                ) : (
                                    <p className="mt-3 text-xs text-muted-foreground">Add an embed URL to preview the map here.</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Media</h3>
                                    <p className="text-sm text-muted-foreground">Refresh visuals to match the brand.</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                                <div className="lg:col-span-1">
                                    <Label htmlFor="cover-image" className="mb-1 block text-sm font-medium">
                                        Logo
                                    </Label>
                                    <ImageInput
                                        initialImage={logoPreview}
                                        onChange={(file, previewUrl) => {
                                            setData('logo', file);
                                            setLogoPreview(previewUrl ?? '');
                                        }}
                                        aspectClass={'aspect-[1/1]'}
                                        imageType="logo"
                                        recommendation="transparent background."
                                    />
                                    <InputError className="text-xs" message={errors.logo} />
                                </div>
                                <div className="lg:col-span-2">
                                    <Label htmlFor="cover-image" className="mb-1 block text-sm font-medium">
                                        Cover Image
                                    </Label>
                                    <ImageInput
                                        initialImage={coverPreview}
                                        onChange={(file, previewUrl) => {
                                            setData('cover', file);
                                            setCoverPreview(previewUrl ?? '');
                                        }}
                                        aspectClass={'aspect-[16/9] sm:aspect-[3/1]'}
                                    />
                                    <InputError className="text-xs" message={errors.cover} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Rankings & scholarship</h3>
                                    <p className="text-sm text-muted-foreground">Keep accolades and offers current.</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-4 lg:grid-cols-5">
                                <div>
                                    <Label className="mb-1 block text-sm font-medium">Founding Year</Label>
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
                                    <Input
                                        value={data.world_ranking}
                                        onChange={(e) => setData('world_ranking', e.target.value)}
                                        className="bg-muted/60"
                                    />
                                    <InputError className="text-xs" message={errors.world_ranking} />
                                </div>
                                <div>
                                    <Label className="mb-1 block text-sm font-medium">QS World Ranking</Label>
                                    <Input value={data.qs_ranking} onChange={(e) => setData('qs_ranking', e.target.value)} className="bg-muted/60" />
                                    <InputError className="text-xs" message={errors.qs_ranking} />
                                </div>
                                <div>
                                    <Label className="mb-1 block text-sm font-medium">Scholarship</Label>
                                    <Input
                                        value={data.scholarship}
                                        onChange={(e) => setData('scholarship', e.target.value)}
                                        className="bg-muted/60"
                                    />
                                    <InputError className="text-xs" message={errors.scholarship} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Content builder</h3>
                                    <p className="text-sm text-muted-foreground">Stack text or video sections to tell the story.</p>
                                </div>
                                <Button type="button" onClick={handleAddNewSection} variant={'outline'} className="h-9">
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Section
                                </Button>
                            </div>

                            <div className="mt-4 flex flex-col gap-6 lg:flex-row">
                                <div className="lg:w-4/12">
                                    <Label className="mb-2 block text-sm font-medium">Sections</Label>
                                    <div className={cn('flex flex-col gap-4', data.content.length > 0 && 'mb-6')}>
                                        {data.content.map((content, index) => (
                                            <div key={index} className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-sm font-semibold text-muted-foreground">
                                                    {index + 1}
                                                </span>
                                                <Input
                                                    id="section"
                                                    type="text"
                                                    name="section"
                                                    value={content.section}
                                                    onChange={(e) => handleSectionChange(index, 'section', e.target.value)}
                                                    placeholder="Section Name"
                                                    className="w-full bg-background"
                                                />

                                                <Select
                                                    value={content.type}
                                                    onValueChange={(value) => handleSectionChange(index, 'type', value)}
                                                    defaultValue="text"
                                                >
                                                    <SelectTrigger className="w-28 bg-background">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="text">Text</SelectItem>
                                                        <SelectItem value="video">Video</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <Button
                                                    type="button"
                                                    onClick={() => handleDeleteSection(index)}
                                                    variant={'destructive'}
                                                    className="h-9 w-9"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start justify-center gap-6 lg:w-8/12">
                                    {data.content.length > 0 ? (
                                        data.content.map((content, index) => {
                                            if (content.type === 'video') {
                                                return (
                                                    <div key={index} className="w-full rounded-lg border bg-muted/40 p-4">
                                                        <input
                                                            id="video_url"
                                                            type="text"
                                                            name="video_url"
                                                            value={content.video_url}
                                                            onChange={(e) => handleSectionChange(index, 'video_url', e.target.value)}
                                                            placeholder="Paste video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                            className={cn(
                                                                'h-12 w-full rounded-md border bg-background px-3 text-sm focus-visible:ring-0 focus-visible:outline-none',
                                                                content.video_url ? 'mb-3' : '',
                                                            )}
                                                        />

                                                        {content.video_url && (
                                                            <iframe
                                                                width="100%"
                                                                className="aspect-video rounded-lg"
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
                                                <div key={index} className="w-full rounded-lg border bg-muted/40">
                                                    <input
                                                        id="heading"
                                                        type="text"
                                                        name="heading"
                                                        value={content.heading}
                                                        onChange={(e) => {
                                                            handleSectionChange(index, 'heading', e.target.value);
                                                        }}
                                                        placeholder="Section Title"
                                                        className="h-12 w-full rounded-t-lg border-b bg-background px-3 text-base focus-visible:ring-0 focus-visible:outline-none"
                                                    />

                                                    <Editor
                                                        onChange={(e) => handleSectionChange(index, 'paragraph', e)}
                                                        initialHtml={content.paragraph}
                                                        className="rounded-b-lg border-0 bg-background"
                                                    />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="w-full flex-1 rounded-lg border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                                            No sections added
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <h3 className="text-base font-semibold">Quick tips</h3>
                            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                                <li>• Use a transparent PNG logo for crisp cards.</li>
                                <li>• Cover image works best at 3:1 ratio.</li>
                                <li>• Keep rankings updated each intake cycle.</li>
                                <li>• Add a video section to boost engagement.</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border bg-background/80 p-5 shadow-sm">
                            <h3 className="text-base font-semibold">Live status</h3>
                            <div className="mt-3 space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Logo</span>
                                    <span
                                        className={cn(
                                            'font-medium',
                                            logoPreview ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground',
                                        )}
                                    >
                                        {logoPreview ? 'Ready' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Cover</span>
                                    <span
                                        className={cn(
                                            'font-medium',
                                            coverPreview ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground',
                                        )}
                                    >
                                        {coverPreview ? 'Ready' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Sections</span>
                                    <span className="font-medium">{data.content.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Rankings</span>
                                    <span className="font-medium">
                                        {[data.guardian_ranking, data.world_ranking, data.qs_ranking].filter(Boolean).length}/3
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
};

export default ShowUniversity;
