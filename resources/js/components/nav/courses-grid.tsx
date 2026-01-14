import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFaculties } from '@/contexts/FacultyContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { BookMarkedIcon, Clock3Icon, GraduationCapIcon, ListIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CoursesGrid() {
    const { featuredFaculties, loading: facultiesLoading, fetchFaculties } = useFaculties();
    const [courses, setCourses] = useState<Course[]>([]);
    const [query, setQuery] = useState('');
    const [courseLoading, setCourseLoading] = useState(true);

    useEffect(() => {
        fetchFaculties();
    }, [fetchFaculties]);

    useEffect(() => {
        let mounted = true;
        setCourseLoading(true);
        (async () => {
            try {
                const res = await axios.get(route('public.courses.list'), { params: { query } });
                if (mounted) {
                    setCourses(res.data ?? []);
                    setCourseLoading(false);
                }
            } catch (e) {
                console.error(e);
                if (mounted) setCourseLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query]);

    const quickLinks = [
        {
            img: '/images/courses/all-courses.svg',
            title: 'Explore All Courses',
            href: route('public.courses.index'),
            description: 'Browse our extensive list of courses available in the UK.',
        },
        {
            img: '/images/courses/foundation.svg',
            title: 'Foundation Courses',
            href: route('public.courses.foundationCourses'),
            description: 'Get started with our foundation courses to prepare for higher education.',
        },
        {
            img: '/images/courses/undergraduate.svg',
            title: 'Undergraduate Courses',
            href: route('public.courses.undergraduateCourses'),
            description: "Pursue your bachelor's degree with our comprehensive undergraduate courses.",
        },
        {
            img: '/images/courses/masters.svg',
            title: 'Masters Courses',
            href: route('public.courses.mastersCourses'),
            description: "Advance your expertise with our specialized master's degree programs.",
        },
        {
            img: '/images/courses/top-up.svg',
            title: 'Top Up Courses',
            href: route('public.courses.topUpCourses'),
            description: 'Complete your degree with our top-up courses designed for diploma holders.',
        },
        {
            img: '/images/courses/phd.svg',
            title: 'PhD Courses',
            href: route('public.courses.phdCourses'),
            description: 'Pursue advanced research and contribute to your field with our PhD programs.',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit(route('public.courses.index', { searchCourse: query }));
    };

    const selectFaculty = (facultyName: string) => {
        router.visit(route('public.courses.index', { faculties: [facultyName] }));
    };

    const isMobile = useIsMobile();

    return (
        <div className="w-[72vw]">
            <div className="flex flex-col gap-2">
                <form className="mx-4 mt-2 flex items-center gap-2 lg:mt-4" onSubmit={handleSubmit}>
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
                <div className="grid grid-cols-2 gap-3 px-4 py-2">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-sm lg:flex-row lg:justify-start lg:gap-4 lg:py-2 lg:shadow-xs"
                        >
                            <img src={item.img} alt="" className="size-10 lg:h-16 lg:w-16" />
                            <div>
                                <div className="mb-1 hidden h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary lg:block" />

                                <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-center text-sm lg:text-start lg:text-lg lg:font-semibold lg:text-transparent">
                                    {item.title}
                                </h2>
                                {/* <h3 className="mb-2 text-lg font-semibold">{item.title}</h3> */}
                                <p className="hidden text-sm text-gray-600 lg:block">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {courseLoading ? (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Loading Courses</div>
                    <div className="my-4 grid grid-cols-2 items-center gap-4 px-6 lg:grid-cols-4">
                        {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    </div>
                </>
            ) : query === '' && courses.length > 0 ? (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Popular Faculties</div>
                    <div className="my-4 grid grid-cols-2 gap-4 px-6 lg:grid-cols-4">
                        {facultiesLoading
                            ? Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => <FacultyCardSkeleton key={i} />)
                            : featuredFaculties.slice(0, isMobile ? 4 : 8).map((faculty) => (
                                  <div
                                      key={faculty.id}
                                      onClick={() => selectFaculty(faculty.name)}
                                      className="group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                  >
                                      <div className="absolute top-3 right-3 text-4xl opacity-10 transition-opacity group-hover:opacity-40">
                                          <BookMarkedIcon className="h-6 w-6" />
                                      </div>
                                      <h3 className="relative z-10 text-sm leading-tight font-semibold text-gray-800 lg:text-base">{faculty.name}</h3>
                                      <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary transition-all duration-200 group-hover:w-full" />
                                  </div>
                              ))}
                    </div>

                    <div className="flex items-center justify-center lg:pb-4">
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

                    <div className="my-4 grid grid-cols-2 items-center gap-4 px-6 lg:grid-cols-4">
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
                                                    <Badge className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                        <BookMarkedIcon className="mr-1 h-3.5 w-3.5 opacity-90" />
                                                        <span className="text-wrap">{course.faculty?.name ?? 'Unknown Faculty'}</span>
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* bottom: meta */}
                                            <div className="mt-2 grid gap-2 lg:grid-cols-2">
                                                <div className="rounded-xl bg-white/10 px-2 py-1 backdrop-blur-sm lg:p-2">
                                                    <p className="text-[10px] font-medium tracking-wide text-white/80 uppercase">Degree</p>
                                                    <div className="mt-1 flex flex-wrap items-center text-sm font-semibold capitalize">
                                                        <GraduationCapIcon className="mr-1 h-4 w-4 opacity-90" />
                                                        <span className="text-xs">{course.study_level}</span>
                                                    </div>
                                                </div>

                                                <div className="hidden rounded-xl bg-white/10 p-2 backdrop-blur-sm lg:block">
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

                    <div className="flex items-center justify-center lg:pb-4">
                        <Link href={route('public.courses.index', { searchCourse: query })}>
                            <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                                <ListIcon className="h-5 w-5" />
                                Explore All Courses
                            </Button>
                        </Link>
                    </div>
                </>
            ) : !courseLoading ? (
                <>
                    <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Search Results</div>
                    <div className="flex w-full flex-col gap-4 pt-8 text-center text-sm text-muted-foreground lg:pb-4">
                        <p>No courses match your search.</p>
                        <Link href={route('public.courses.index')}>
                            <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                                <ListIcon className="h-5 w-5" />
                                Explore All Courses
                            </Button>
                        </Link>
                    </div>
                </>
            ) : null}
        </div>
    );
}

function FacultyCardSkeleton() {
    return (
        <div className="group relative flex h-32 flex-col justify-end overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="absolute top-3 right-3 text-4xl opacity-20">
                <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
            </div>
            <div className="relative z-10 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
        </div>
    );
}

function CourseCardSkeleton() {
    return (
        <div className="relative h-20 overflow-hidden rounded-2xl border bg-card py-0 shadow-sm">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="relative flex h-full flex-col justify-end p-4">
                {/* Title placeholder */}
                <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
            </div>
        </div>
    );
}
