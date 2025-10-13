import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { AlbumIcon, ChevronRightIcon, FootprintsIcon, GraduationCapIcon, HomeIcon, LandmarkIcon, MenuIcon, NotebookPenIcon } from 'lucide-react';
import { useState } from 'react';

const NavMenuMobile = () => {
    const [accordionValue, setAccordionValue] = useState<string>('');

    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center">
                <MenuIcon className="h-6 w-6 text-theme-muted" />
            </SheetTrigger>
            <SheetContent className="flex w-10/12 flex-col justify-between gap-0 border-none shadow-none">
                <nav className="h-full bg-theme/5">
                    <SheetHeader className="h-20 justify-center gap-0 bg-theme px-4 py-0">
                        <div className="flex items-center gap-3">
                            <img src="/images/edec_globe.svg" alt="" className="h-fit w-18" />
                            <div className="flex flex-col border-l pl-3 text-white">
                                <p className="text-xs text-white/70">Welcome!</p>
                                <p className="text-xl font-bold tracking-wider">
                                    <span className="text-theme-accent">EARTH</span> <span className="text-theme-secondary">DREAMS</span>
                                </p>
                                <p className="text-xs text-muted">Education & Consultancy</p>
                            </div>
                        </div>
                    </SheetHeader>
                    <div className="grid">
                        <Accordion value={accordionValue} onValueChange={setAccordionValue} type="single" collapsible className="w-full">
                            <Link
                                href="/"
                                className={clsx(
                                    'flex items-center gap-3 border-b px-6 py-5 font-medium transition-all hover:bg-muted/50',
                                    route().current('public.index') && 'bg-muted text-theme-accent',
                                )}
                            >
                                <HomeIcon className="h-6 w-6 text-accent-foreground/90" />
                                <span className="font-semibold tracking-wide text-accent-foreground/90">Home</span>
                            </Link>

                            <AccordionItem value="item-1">
                                <AccordionTrigger className={cn('px-6 py-5', accordionValue === 'item-1' ? 'bg-accent-foreground/5' : '')}>
                                    <div className="flex items-center gap-3">
                                        <GraduationCapIcon className="h-6 w-6 text-accent-foreground/90" />
                                        <span className="font-semibold tracking-wide text-accent-foreground/90">Study in UK</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col bg-accent-foreground/5 pr-4 pb-2">
                                    <Link className="border-t py-3 pl-15">Link1</Link>
                                    <Link className="ml-15 border-t border-gray-300 py-3">Link2</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className={cn('px-6 py-5', accordionValue === 'item-2')}>
                                    <div className="flex items-center gap-3">
                                        <LandmarkIcon className="h-6 w-6 text-accent-foreground/90" />
                                        <span className="font-semibold tracking-wide text-accent-foreground/90">Universities</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col bg-accent-foreground/5 pr-4 pb-2 font-semibold text-muted-foreground">
                                    <Link href={route('public.universities.index')} className="border-t py-3 pl-15">
                                        Find universities
                                    </Link>
                                    <Link className="ml-15 border-t border-gray-300 py-3">Ranking</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className={cn('px-6 py-5', accordionValue === 'item-3')}>
                                    <div className="flex items-center gap-3">
                                        <AlbumIcon className="h-6 w-6 text-accent-foreground/90" />
                                        <span className="font-semibold tracking-wide text-accent-foreground/90">Courses</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col bg-accent-foreground/5 pr-4 pb-2">
                                    <Link className="border-t py-3 pl-15">Link1</Link>
                                    <Link className="ml-15 border-t py-3">Link2</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className={cn('px-6 py-5', accordionValue === 'item-4')}>
                                    <div className="flex items-center gap-3">
                                        <FootprintsIcon className="h-6 w-6 text-accent-foreground/90" />
                                        <span className="font-semibold tracking-wide text-accent-foreground/90">Pathway</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col bg-accent-foreground/5 pr-4 pb-2">
                                    <Link className="border-t py-3 pl-15">Link1</Link>
                                    <Link className="ml-15 border-t py-3">Link2</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className={cn('px-6 py-5', accordionValue === 'item-')}>
                                    <div className="flex items-center gap-3">
                                        <NotebookPenIcon className="h-6 w-6 text-accent-foreground/90" />
                                        <span className="font-semibold tracking-wide text-accent-foreground/90">Blogs</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col bg-accent-foreground/5 pr-4 pb-2">
                                    <Link href={route('public.blogs.index')} className="border-t py-3 pl-15">
                                        Show Latest Blogs
                                    </Link>
                                    <Link className="ml-15 border-t py-3">Link2</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <Link
                                href="/"
                                className="mx-4 flex flex-1 items-center pt-4 font-medium text-theme-accent transition-all hover:underline"
                            >
                                <Button className="w-full">
                                    <span>Apply Now</span>
                                    <ChevronRightIcon className="size-4 transform transition-all duration-200 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </Accordion>
                    </div>
                </nav>

                <SheetFooter className="flex items-center justify-between bg-foreground/10">
                    <span className="text-xs text-muted-foreground">All rights reserved © 2023 Earth Dreams Education</span>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default NavMenuMobile;
