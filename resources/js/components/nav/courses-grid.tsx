import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Faculty } from '@/types/faculty';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { ListIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CoursesGrid() {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [query, setQuery] = useState('');

    // fetch once
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axios.get(route('public.faculties.list'));
                if (mounted) setFaculties(res.data ?? []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [query]);

    // match StudyInUKGrid look: two-column floating nav rows
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

    return (
        <div className="w-[72vw]">
            {/* Search + quick links */}
            <div className="flex flex-col gap-2">
                <div className="relative mx-4 mt-4">
                    <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search university…"
                        className="w-full rounded-3xl border bg-white/70 px-9 py-2 text-sm ring-0 transition outline-none focus:border-theme focus:bg-white"
                    />
                </div>

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

            <div className="w-full border-b pb-2 text-center font-semibold text-muted-foreground">Popular Faculties</div>
            {/* Featured carousel (optional) */}
            {faculties.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4 p-4">
                    {faculties.map((faculty) => (
                        <Badge
                            variant={'themeSecondary'}
                            className="cursor-pointer rounded-3xl px-4 py-1 text-sm transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-80"
                        >
                            {faculty.name}
                        </Badge>
                    ))}
                </div>
            ) : (
                <div className="flex w-full flex-col gap-4 pt-8 pb-4 text-center text-sm text-muted-foreground">
                    <p>No match your search.</p>
                    <Button variant={'secondary'} className="mx-auto w-fit rounded-3xl">
                        <ListIcon className="h-5 w-5" />
                        Explore All Courses
                    </Button>
                </div>
            )}
        </div>
    );
}
