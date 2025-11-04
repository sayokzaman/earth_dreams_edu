import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from 'lucide-react';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

const NavMenuPC = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem className="hidden 2xl:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href={route('public.study.index')}>Study in UK</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="mt-2 grid gap-2 rounded-lg bg-muted p-5 shadow-lg md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3 border-r">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden select-none hover:bg-gray-300 focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components built with Tailwind CSS.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <NavigationMenuLink asChild>
                            <Link href="/universities">Universities</Link>
                        </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="mt-2 grid w-[400px] gap-2 rounded-lg bg-muted p-5 shadow-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem key={component.title} title={component.title} href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <NavigationMenuLink asChild>
                            <Link href="/docs">Courses</Link>
                        </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="mt-2 grid w-[400px] -translate-x-1/3 gap-2 rounded-lg bg-muted p-5 shadow-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem key={component.title} title={component.title} href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <NavigationMenuLink asChild>
                            <Link href="/docs">Pathway</Link>
                        </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="mt-2 grid w-[400px] -translate-x-1/2 gap-2 rounded-lg bg-muted p-5 shadow-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem key={component.title} title={component.title} href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <NavigationMenuLink asChild>
                            <Link href="/blogs">Blogs</Link>
                        </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="mt-2 grid w-[400px] -translate-x-1/2 gap-2 rounded-lg bg-muted p-5 shadow-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem key={component.title} title={component.title} href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/docs">
                            <Button className="group rounded-3xl font-bold">
                                <span className="pl-1">Apply Now</span>
                                <ChevronRightIcon className="size-4 transform transition-all duration-200 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props} className="rounded-sm p-3 outline-black/5 hover:bg-theme-foreground/5 hover:outline">
            <NavigationMenuLink asChild>
                <Link href={href} className="flex flex-col gap-2">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-theme-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

export default NavMenuPC;
