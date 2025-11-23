import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Course } from '@/types/course';
import { Faculty } from '@/types/faculty';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { BookMarkedIcon, Clock3Icon, GraduationCapIcon, ListIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CoursesGrid() {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(route('public.faculties.list'));
                setFaculties(res.data ?? []);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axios.get(route('public.courses.list'), { params: { query } });
                if (mounted) setCourses(res.data ?? []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query]);

    const quickLinks = [
        {
            img: '/images/universities/all-universities.svg',
            title: 'Explore All Courses',
            href: route('public.courses.index'),
            description: 'Browse the full list by country, course, or rank.',
        },
        {
            img: '/images/universities/all-universities.svg',
            title: 'Foundation Courses',
            href: route('public.courses.foundationCourses'),
            description: 'Browse the full list by country, course, or rank.',
        },
        {
            img: '/images/universities/russell-group.svg',
            title: 'Undergraduate Courses',
            href: route('public.courses.undergraduateCourses'),
            description: 'Explore the prestigious Russell Group of UK universities.',
        },
        {
            img: '/images/universities/rankings.svg',
            title: 'Masters Courses',
            href: route('public.courses.mastersCourses'),
            description: '',
        },
        {
            img: '/images/universities/top-universities.svg',
            title: 'Top Up Courses',
            href: route('public.courses.topUpCourses'),
            description: '',
        },
        {
            img: '/images/universities/top-universities.svg',
            title: 'PhD Courses',
            href: route('public.courses.phdCourses'),
            description: '',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit(route('public.courses.index', { searchCourse: query }));
    };

    const selectFaculty = (facultyName: string) => {
        router.visit(route('public.courses.index', { faculties: [facultyName] }));
    };

    return (
        <div className="w-[72vw]">
            <div className="flex flex-col gap-2">
                <form className="mx-4 mt-4 flex items-center gap-2" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search courses…"
                            className="w-full rounded-3xl border bg-white/70 px-9 py-2 text-sm ring-0 transition outline-none focus:border-theme focus:bg-white"
                        />
                    </div>
                    <Button type="submit" variant={'secondary'} className="h-9 rounded-3xl">
                        Search
                    </Button>
                </form>
                <div className="grid grid-cols-2 gap-1 px-4 py-2">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-6 rounded-lg px-4 py-2 transition-transform duration-200 ease-in-out hover:bg-white"
                        >
                            <img src={item.img} alt="" className="h-16 w-16" />
                            <div>
                                <div className="mb-1 h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />
                                <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-lg font-bold text-transparent">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {query === '' && courses.length > 0 && faculties.length > 0 ? (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Popular Faculties</div>
                    <div className="flex flex-wrap justify-center gap-4 p-4">
                        {faculties.map((faculty) => (
                            <Badge
                                key={faculty.id}
                                onClick={() => selectFaculty(faculty.name)}
                                className="cursor-pointer rounded-3xl bg-black/70 px-4 py-1 text-sm text-white backdrop-blur-2xl transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-80"
                            >
                                {faculty.name}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-center pb-4">
                        <Link href={route('public.courses.index', { searchCourse: query })}>
                            <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                                <ListIcon className="h-5 w-5" />
                                Show All Courses
                            </Button>
                        </Link>
                    </div>
                </>
            ) : query !== '' && courses.length > 0 ? (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Search Results</div>

                    <div className="my-4 grid grid-cols-4 items-center gap-4 px-6">
                        {courses &&
                            courses.length > 0 &&
                            courses.slice(0, 4).map((course) => (
                                <Link
                                    key={course.id}
                                    href={route('public.courses.show', course.title)}
                                    className="group block transition-transform duration-200 ease-out hover:-translate-y-0.5"
                                >
                                    <Card className="relative h-44 overflow-hidden rounded-2xl border bg-card py-0 shadow-sm transition-all duration-200 group-hover:shadow-lg">
                                        {/* cover */}
                                        <img
                                            src={course.cover}
                                            alt={`${course.title} cover image`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            loading="lazy"
                                        />

                                        {/* dark overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                        <CardContent className="relative flex h-full flex-col justify-between p-4 text-white">
                                            {/* top: title */}
                                            <p className="line-clamp-2 text-base leading-snug font-semibold drop-shadow-sm">{course.title}</p>
                                            <div>
                                                {/* faculty */}
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Badge className="rounded-full bg-white/10 text-white backdrop-blur-sm">
                                                        <BookMarkedIcon className="mr-1 h-3.5 w-3.5 opacity-90" />
                                                        {course.faculty?.name ?? 'Unknown Faculty'}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* bottom: meta */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
                                                    <p className="text-[11px] font-medium tracking-wide text-white/80 uppercase">Degree</p>
                                                    <div className="mt-1 flex flex-wrap items-center text-sm font-semibold capitalize">
                                                        <GraduationCapIcon className="mr-1 h-4 w-4 opacity-90" />
                                                        {course.study_level}
                                                    </div>
                                                </div>

                                                <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
                                                    <p className="text-[11px] font-medium tracking-wide text-white/80 uppercase">Duration</p>
                                                    <div className="mt-1 flex flex-wrap items-center text-sm font-semibold capitalize">
                                                        <Clock3Icon className="mr-1 h-4 w-4 opacity-90" />
                                                        {course.duration} {course.duration_unit}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>

                    <div className="flex items-center justify-center pb-4">
                        <Link href={route('public.courses.index', { searchCourse: query })}>
                            <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                                <ListIcon className="h-5 w-5" />
                                Explore Courses
                            </Button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Search Results</div>
                    <div className="flex w-full flex-col gap-4 pt-8 pb-4 text-center text-sm text-muted-foreground">
                        <p>No courses match your search.</p>
                        <Link href={route('public.courses.index')}>
                            <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                                <ListIcon className="h-5 w-5" />
                                Explore All Courses
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
