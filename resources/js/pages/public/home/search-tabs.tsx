import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Blog } from '@/types/blog';
import { Course } from '@/types/course';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { BookMarkedIcon, CalendarClockIcon, CompassIcon, MapPinIcon, PenToolIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const tabTriggerClasses =
    'h-10 rounded-3xl border text-sm text-gray-200 data-[state=active]:bg-muted data-[state=active]:backdrop-blur sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:text-base sm:data-[state=active]:rounded-t-xl sm:data-[state=active]:border-b-2 sm:data-[state=active]:border-white sm:data-[state=active]:bg-transparent sm:data-[state=active]:font-bold sm:data-[state=active]:text-gray-200 sm:data-[state=active]:shadow-none sm:data-[state=active]:backdrop-blur-none';

export function SearchTabs({ className }: { className?: string }) {
    const [query, setQuery] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>('universities');

    const [universities, setUniversities] = useState<University[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        let mounted = true;

        if (selectedTab === 'location') {
            setUniversities([]);
            setCourses([]);
            setBlogs([]);
            return;
        }

        (async () => {
            try {
                const res = await axios.get(route(`public.${selectedTab}.list`), { params: { query } });
                if (mounted) {
                    if (selectedTab === 'universities') {
                        setUniversities(res.data);
                    } else if (selectedTab === 'courses') {
                        setCourses(res.data);
                    } else if (selectedTab === 'blogs') {
                        setBlogs(res.data);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query, selectedTab]);

    return (
        <div className={cn('mx-auto w-full rounded-2xl', className)}>
            <Tabs
                value={selectedTab}
                onValueChange={(tab) => {
                    setSelectedTab(tab);
                    setQuery('');
                }}
            >
                {/* Tabs header */}
                <TabsList className="mb-4 grid h-auto w-full grid-cols-2 gap-3 rounded-lg bg-transparent sm:mb-6 sm:grid-cols-4 sm:gap-0">
                    <TabsTrigger value="universities" className={tabTriggerClasses}>
                        University
                    </TabsTrigger>

                    <TabsTrigger value="courses" className={tabTriggerClasses}>
                        Courses
                    </TabsTrigger>

                    <TabsTrigger value="blogs" className={tabTriggerClasses}>
                        Blogs & Events
                    </TabsTrigger>

                    <TabsTrigger value="location" className={tabTriggerClasses}>
                        Location
                    </TabsTrigger>
                </TabsList>

                {/* University tab */}
                <TabsContent value="universities" className="relative grid items-center gap-4">
                    <form className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm text-white backdrop-blur-sm"
                            placeholder="Search universities..."
                        />

                        <Link href={route('public.universities.index', { searchUniversity: query })}>
                            <Button type="submit" variant="secondary" className="text-md w-full rounded-3xl sm:w-40">
                                <Search className="mr-1 h-4 w-4" />
                                Search
                            </Button>
                        </Link>
                    </form>

                    {query !== '' &&
                        (universities.length > 0 ? (
                            <ul className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2">
                                {universities.slice(0, 5).map((university) => (
                                    <li key={university.id}>
                                        <Link href={route('public.universities.show', university.name)}>
                                            <Card className="flex flex-row items-center gap-4 border-0 bg-accent-foreground px-4 py-3 text-white shadow-none transition hover:bg-white/5">
                                                <img src={university.logo} alt={university.name} className="size-10 rounded-full object-cover" />

                                                <CardContent className="flex w-full flex-col justify-center px-0">
                                                    <p className="font-semibold">{university.name}</p>

                                                    <span className="flex flex-col justify-between gap-1 text-sm text-muted/60 sm:flex-row sm:items-center">
                                                        <span className="flex items-center gap-1">
                                                            <MapPinIcon className="inline h-4 w-4" />
                                                            {university.location}
                                                        </span>

                                                        <span className="flex gap-1 pt-1 sm:pt-0">
                                                            <Badge className="rounded-2xl bg-white/10">QS: {university.qs_ranking}</Badge>

                                                            <Badge className="rounded-2xl bg-white/10">THE: {university.world_ranking}</Badge>

                                                            <Badge className="rounded-2xl bg-white/10">Guardian: {university.guardian_ranking}</Badge>
                                                        </span>
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2 px-4 py-3 text-center text-white">
                                <p>No universities found</p>

                                <Link href={route('public.universities.index')}>
                                    <Button className="mt-2 rounded-3xl">View all universities</Button>
                                </Link>
                            </div>
                        ))}
                </TabsContent>

                {/* Courses tab */}
                <TabsContent value="courses" className="relative grid items-center gap-4">
                    <form className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm text-white backdrop-blur-sm"
                            placeholder="Search courses..."
                        />

                        <Link href={route('public.courses.index', { searchCourse: query })}>
                            <Button type="submit" variant="secondary" className="text-md w-full rounded-3xl sm:w-40">
                                <Search className="mr-1 h-4 w-4" />
                                Search
                            </Button>
                        </Link>
                    </form>

                    {query !== '' &&
                        (courses.length > 0 ? (
                            <ul className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2">
                                {courses.slice(0, 5).map((course) => (
                                    <li key={course.id}>
                                        <Link href={route('public.courses.show', course.title)}>
                                            <Card className="border-0 bg-accent-foreground px-4 py-3 text-white shadow-none transition hover:bg-white/5">
                                                <CardContent className="flex w-full flex-col justify-center px-0">
                                                    <p className="font-semibold">{course.title}</p>

                                                    <span className="flex flex-col justify-between gap-1 text-sm text-muted/60 sm:flex-row sm:items-center">
                                                        <span className="flex items-center gap-1">
                                                            <BookMarkedIcon className="inline h-4 w-4" />
                                                            Faculty of {course.faculty?.name}
                                                        </span>

                                                        <span className="flex gap-1 pt-1 sm:pt-0">
                                                            <Badge className="rounded-2xl bg-white/10">Degree: {course.study_level}</Badge>

                                                            <Badge className="rounded-2xl bg-white/10">
                                                                Duration: {course.duration} {course.duration_unit}
                                                            </Badge>
                                                        </span>
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2 px-4 py-3 text-center text-white">
                                <p>No courses found</p>

                                <Link href={route('public.courses.index')}>
                                    <Button className="mt-2 rounded-3xl">View all courses</Button>
                                </Link>
                            </div>
                        ))}
                </TabsContent>

                {/* Blogs tab */}
                <TabsContent value="blogs" className="relative grid items-center gap-4">
                    <form className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm text-white backdrop-blur-sm"
                            placeholder="Search blogs..."
                        />

                        <Link href={route('public.blogs.index', { searchBlog: query })}>
                            <Button type="submit" variant="secondary" className="text-md w-full rounded-3xl sm:w-40">
                                <Search className="mr-1 h-4 w-4" />
                                Search
                            </Button>
                        </Link>
                    </form>

                    {query !== '' &&
                        (blogs.length > 0 ? (
                            <ul className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2">
                                {blogs.slice(0, 5).map((blog) => (
                                    <li key={blog.id}>
                                        <Link href={route('public.blogs.show', blog.id)}>
                                            <Card className="border-0 bg-accent-foreground px-4 py-3 text-white shadow-none transition hover:bg-white/5">
                                                <CardContent className="flex w-full flex-col justify-center px-0">
                                                    <p className="font-semibold">{blog.title}</p>

                                                    <span className="flex flex-col justify-between gap-1 text-sm text-muted/60 sm:flex-row sm:items-center">
                                                        <span className="flex gap-1 pt-1 sm:pt-0">
                                                            <Badge className="rounded-2xl bg-white/10">
                                                                Published: {format(new Date(blog.date), 'dd/MM/yyyy')}
                                                            </Badge>

                                                            <Badge className="rounded-2xl bg-white/10 capitalize">Category: {blog.category}</Badge>
                                                        </span>

                                                        <Badge
                                                            className="rounded-2xl bg-black/70 text-xs font-bold capitalize shadow-md"
                                                            variant={
                                                                blog.type === 'blog'
                                                                    ? 'blue'
                                                                    : blog.type === 'news'
                                                                      ? 'orange'
                                                                      : blog.type === 'event'
                                                                        ? 'green'
                                                                        : 'default'
                                                            }
                                                        >
                                                            {blog.type === 'blog' ? (
                                                                <PenToolIcon className="size-5" />
                                                            ) : blog.type === 'news' ? (
                                                                <CompassIcon className="size-5" />
                                                            ) : blog.type === 'event' ? (
                                                                <CalendarClockIcon className="size-5" />
                                                            ) : null}
                                                            {blog.type}
                                                        </Badge>
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="absolute top-12 z-10 w-full overflow-hidden rounded-2xl border border-muted-foreground/20 bg-accent-foreground p-2 px-4 py-3 text-center text-white">
                                <p>No universities found</p>

                                <Link href={route('public.universities.index')}>
                                    <Button className="mt-2 rounded-3xl">View all universities</Button>
                                </Link>
                            </div>
                        ))}
                </TabsContent>

                {/* Location tab */}
                <TabsContent value="location" className="grid items-center gap-4">
                    <form className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm text-white backdrop-blur-sm"
                            placeholder="Search location..."
                        />

                        <Link href={route('public.universities.index', { searchLocation: query })}>
                            <Button type="submit" variant="secondary" className="text-md w-full rounded-3xl sm:w-40">
                                <Search className="mr-1 h-4 w-4" />
                                Search
                            </Button>
                        </Link>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
