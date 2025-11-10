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

/**
 * shadcn/ui NavigationMenu — centered viewport version
 * ----------------------------------------------------
 * This keeps the dropdown (mega menu) centered on the SCREEN
 * regardless of which trigger opens it.
 *
 * Key idea:
 *   - Use a custom <NavigationMenuViewport> that is FIXED and centered
 *     via left-1/2 -translate-x-1/2. Radix will still mount/unmount the
 *     active <NavigationMenuContent> inside this viewport, so it stays
 *     perfectly centered relative to the viewport, not the trigger.
 */

export default function UKNavbar() {
    return (
        <div className="sticky top-0 z-50 w-full text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-4 py-3">
                {/* NAVIGATION */}
                <NavigationMenu
                    /**
                     * Put the viewport on a fixed layer, centered on screen.
                     * We still render the list inline here.
                     */
                    className="hidden items-center md:flex"
                >
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
                            // base shadcn styles + our centered layer
                            'origin-top-center rounded-2xl bg-[#f1f5f8] text-zinc-900 shadow-2xl',
                            // fixed centered position — same as viewportRefClassName fallback
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
