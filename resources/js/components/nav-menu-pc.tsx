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
                                    <Link href={route('public.universities.index')}>Courses</Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <UniversitiesGrid />
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

/**
 * Mega menu content
 */
function StudyInUKGrid() {
    const studyInUK = [
        {
            img: '/images/study-in-uk/why-study-in-uk.svg',
            title: 'Why Study in the UK',
            href: route('public.study.whyStudyInUK'),
            description: 'Explore the benefits and opportunities of studying in the UK.',
        },
        {
            img: '/images/study-in-uk/what-can-i-study.svg',
            title: 'What can I Study',
            href: route('public.study.canStudy'),
            description: 'Discover the wide range of courses and programs available for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/january-intake.svg',
            title: 'January Intake',
            href: route('public.study.intake.january'),
            description: 'Learn about the January intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/may-intake.svg',
            title: 'May Intake',
            href: route('public.study.intake.may'),
            description: 'Find out about the May intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/september-intake.svg',
            title: 'September Intake',
            href: route('public.study.intake.september'),
            description: 'Explore the September intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/cost-of-study.svg',
            title: 'Cost of Study',
            href: route('public.study.costOfStudy'),
            description: 'Get a clear understanding of the cost of studying in the UK for international students.',
        },
        {
            img: '/images/study-in-uk/ucas.svg',
            title: 'UCAS',
            href: route('public.study.ucas'),
            description: 'Learn about the UCAS application process for international students applying to UK universities.',
        },
        {
            img: '/images/study-in-uk/student-essentials.svg',
            title: 'Student Essentials',
            href: route('public.study.studentEssentials'),
            description: 'Find out about the essential information and resources for international students studying in the UK.',
        },
    ];

    return (
        <div className="grid w-[60vw] grid-cols-2 p-2">
            {studyInUK.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-6 rounded-lg p-4 transition-transform duration-200 ease-in-out hover:scale-102"
                >
                    <img src={item.img} alt="" className="h-16 w-16" />
                    <div>
                        <div className="mb-1 h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />

                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-lg font-bold text-transparent">
                            {item.title}
                        </h2>
                        {/* <h3 className="mb-2 text-lg font-semibold">{item.title}</h3> */}
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function UniversitiesGrid() {
    return <div>UniversitiesGrid</div>;
}
