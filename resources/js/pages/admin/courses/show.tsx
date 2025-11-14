import Editor from '@/components/editor';
import CoverImageInput from '@/components/image-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { DeleteCourseDialog } from '@/pages/admin/courses/delete-dialog';
import { BreadcrumbItem } from '@/types';
import { Course, CourseContent } from '@/types/course';
import { Faculty } from '@/types/faculty';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Check, ChevronsUpDown, PlusIcon, TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    course: Course;
};

const CreateCourse = ({ course }: Props) => {
    const { data, setData, post, processing, errors, reset, clearErrors, setDefaults } = useForm({
        id: course.id || null,
        title: course.title || '',
        faculty_id: course.faculty?.id.toString() || '',
        study_level: course.study_level || '',
        duration: course.duration || '',
        duration_unit: course.duration_unit || '',
        cover: null as File | null,
        contents: [] as CourseContent[],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: '/courses',
        },
        {
            title: course.title,
            href: `/courses/${course.id}`,
        },
    ];

    const [deleteModalData, setDeleteModalData] = useState<Course | null>(null);

    const [coverPreview, setCoverPreview] = useState<string>('');

    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [search, setSearch] = useState('');

    const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(course.faculty || null);

    const [open, setOpen] = useState(false);

    const widthRef = useRef<HTMLButtonElement>(null);
    const [contentWidth, setContentWidth] = useState(widthRef.current?.offsetWidth || 0);

    useEffect(() => {
        if (course) {
            setData({
                id: course.id,
                title: course.title,
                faculty_id: course.faculty?.id.toString() || '',
                study_level: course.study_level || '',
                duration: course.duration || '',
                duration_unit: course.duration_unit || '',
                cover: null,
                contents: course.contents,
            });

            if (course.cover) {
                setCoverPreview(`/storage/${course.cover}`);
            }
        }
    }, [course, setData]);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get(route('admin.faculties.index'), {
                    params: { search },
                });
                setFaculties(response.data.faculties);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };

        fetchFaculties();
    }, [search]);

    useEffect(() => {
        if (widthRef.current) {
            const width = widthRef.current.offsetWidth;
            setContentWidth(width);
        }
    }, [widthRef]);

    const handleAddNewSection = () => {
        setData('contents', [
            ...data.contents,
            {
                type: 'text',
                section: `Section ${data.contents.length + 1}`,
                heading: '',
                paragraph: '',
                video_url: '',
            },
        ]);
    };

    const handleDeleteSection = (index: number) => {
        setData(
            'contents',
            data.contents.filter((_, i) => i !== index),
        );
    };

    const handleSectionChange = (index: number, key: string, value: string) => {
        setData(
            'contents',
            data.contents.map((section, i) => (i === index ? { ...section, [key]: value } : section)),
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.courses.update', course.id), {
            method: 'patch',
            forceFormData: true,
            onSuccess: () => {
                clearErrors();
                reset();
                setDefaults();
                setCoverPreview('');
            },
            preserveScroll: true,
        });
    };

    const selectFaculty = (facultyId: string) => {
        setSelectedFaculty(faculties.find((faculty) => faculty.id === Number(facultyId)) || null);
        setData('faculty_id', facultyId);
    };

    const handleAddFaculty = async () => {
        try {
            const response = await axios.post(route('admin.faculties.store'), { name: search });
            setData('faculty_id', response.data.faculty.id);
            setSelectedFaculty(response.data.faculty);
            setSearch('');
            setOpen(false);
        } catch (error) {
            console.error('Error adding faculty:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${course.title}`} />

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">{course.title}</h2>
                        <p className="text-sm text-muted-foreground">Faculty: {course.faculty?.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Course'}
                        </Button>

                        <Button type="button" variant="destructive" disabled={processing} onClick={() => setDeleteModalData(course)}>
                            {processing ? 'Deleting...' : 'Delete Course'}
                        </Button>
                    </div>

                    <DeleteCourseDialog course={deleteModalData} setCourse={setDeleteModalData} />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="sm:w-1/2">
                        <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Course Title <span className="text-sm text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Course Title"
                            className="bg-muted/60"
                        />
                        <InputError className="text-xs" message={errors.title} />
                    </div>

                    <div className="sm:w-1/2">
                        <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Faculty <span className="text-sm text-red-500">*</span>
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
                                    <p className="capitalize">{selectedFaculty ? selectedFaculty.name : 'Select Faculty'}</p>
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2" style={{ width: contentWidth }}>
                                <Input placeholder="Search faculty..." className="h-9" value={search} onChange={(e) => setSearch(e.target.value)} />

                                <div className="mt-2 flex flex-col items-center gap-1 border-t pt-2 text-sm">
                                    {faculties.length > 0 ? (
                                        faculties.map((faculty) => {
                                            const selected = faculty.id.toString() === data.faculty_id;

                                            return (
                                                <button
                                                    key={faculty.id}
                                                    onClick={() => {
                                                        selectFaculty(faculty.id.toString());
                                                        setOpen(false);
                                                    }}
                                                    className={cn(
                                                        'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors',
                                                        selected
                                                            ? 'bg-accent text-accent-foreground'
                                                            : 'hover:bg-accent/80 hover:text-accent-foreground',
                                                    )}
                                                >
                                                    <span className="font-medium capitalize">{faculty.name}</span>
                                                    {selected && <Check className="h-4 w-4" />}
                                                </button>
                                            );
                                        })
                                    ) : search === '' ? (
                                        <p className="py-4 text-center text-sm text-muted-foreground">No faculties found</p>
                                    ) : (
                                        <Button onClick={handleAddFaculty} className="my-1.5 w-fit">
                                            Faculty not found. Add this faculty?
                                        </Button>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <InputError className="text-xs" message={errors.faculty_id} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="sm:w-1/2">
                        <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                            Study Level <span className="text-sm text-red-500">*</span>
                        </Label>

                        <Select value={data.study_level} onValueChange={(value) => setData('study_level', value)}>
                            <SelectTrigger className="bg-muted/60">
                                <SelectValue placeholder="Select Study Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                <SelectItem value="masters">Masters</SelectItem>
                                <SelectItem value="foundation">Foundation</SelectItem>
                                <SelectItem value="top_up">Top Up</SelectItem>
                                <SelectItem value="phd">PhD</SelectItem>
                                <SelectItem value="doctorate">Doctorate</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError className="text-xs" message={errors.study_level} />
                    </div>

                    <div className="flex gap-4 sm:w-1/2">
                        <div className="w-1/2">
                            <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                                Duration <span className="text-sm text-red-500">*</span>
                            </Label>

                            <Input
                                id="duration"
                                type="text"
                                name="duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                placeholder="e.g., 3, 6 etc."
                                className="w-full bg-muted/60"
                            />
                            <InputError className="text-xs" message={errors.duration} />
                        </div>

                        <div className="w-1/2">
                            <Label htmlFor="name" className="mb-1 flex items-start gap-1 text-lg font-medium">
                                Month/Year <span className="text-sm text-red-500">*</span>
                            </Label>

                            <Select value={data.duration_unit} onValueChange={(value) => setData('duration_unit', value as 'months' | 'years')}>
                                <SelectTrigger className="bg-muted/60">
                                    <SelectValue placeholder="Select Month/Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="months">Month</SelectItem>
                                    <SelectItem value="years">Year</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError className="text-xs" message={errors.duration_unit} />
                        </div>
                    </div>
                </div>

                <div>
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

                <div>
                    <Label htmlFor="description" className="mb-4 block border-b pb-1.5 text-lg font-medium">
                        Content
                    </Label>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="lg:w-4/12">
                            <Label className="mb-2 block font-medium">
                                Sections <span className="text-sm text-red-500">*</span>
                            </Label>
                            <div className={cn('flex flex-col gap-4', data.contents.length > 0 && 'mb-6')}>
                                {data.contents.map((content, index) => (
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

                                        <Select
                                            value={content.type}
                                            onValueChange={(value) => handleSectionChange(index, 'type', value)}
                                            defaultValue="text"
                                        >
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

                            <InputError className="text-xs" message={errors.contents} />
                        </div>

                        <div className="flex flex-col items-start justify-center gap-6 lg:w-8/12">
                            {data.contents.length > 0 ? (
                                data.contents.map((content, index) => {
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

export default CreateCourse;
