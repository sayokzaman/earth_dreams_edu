import CoursesGrid from '@/components/nav/courses-grid';
import StudyInUKGrid from '@/components/nav/study-in-uk-grid';
import UniversitiesGrid from '@/components/nav/universities-grid';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function UKNavbar() {
    return (
        <div className="sticky top-0 z-50 w-full text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-4 py-3">
                {/* NAVIGATION */}
                <NavigationMenu className="hidden items-center md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Link href={route('public.index')}>Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <NavigationMenuLink>
                                    <Link href={route('public.study.index')}>Study in UK</Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <StudyInUKGrid />
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <NavigationMenuLink>
                                    <Link href={route('public.universities.index')}>Universities</Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <UniversitiesGrid />
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <NavigationMenuLink>
                                    <Link href={route('public.courses.index')}>Courses</Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <CoursesGrid />
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                            <Link href={route('public.blogs.index')}>Blogs & Events</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    {/* FIXED, CENTERED VIEWPORT */}
                    <NavigationMenuViewport
                        className={cn(
                            'origin-top-center rounded-2xl bg-[#f1f5f8] text-zinc-900 shadow-2xl',
                            'fixed top-[66px] left-1/2 w-full max-w-[80vw] -translate-x-1/2',
                        )}
                    />
                </NavigationMenu>

                <Link href={route('public.consultation.index')}>
                    <Button className="rounded-3xl font-semibold">Apply Now</Button>
                </Link>
            </div>
        </div>
    );
}
