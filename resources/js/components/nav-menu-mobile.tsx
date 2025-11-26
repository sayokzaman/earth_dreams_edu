import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { AlbumIcon, ChevronRightIcon, GraduationCapIcon, HomeIcon, LandmarkIcon, MenuIcon, NotebookPenIcon } from 'lucide-react';
import { useState } from 'react';

// your existing mega grids
import CoursesGrid from '@/components/nav/courses-grid';
import StudyInUKGrid from '@/components/nav/study-in-uk-grid';
import UniversitiesGrid from '@/components/nav/universities-grid';

const NavMenuMobile = () => {
    const [accordionValue, setAccordionValue] = useState<string>('');

    const accordionTriggerClasses = (item: string) => {
        return `px-6 py-4 border-b transition-all duration-300 ease-in-out ${accordionValue === item ? 'text-white' : ''}`;
    };

    const changeBackground = (item: string) => {
        if (accordionValue === item) {
            return 'bg-theme/80 shadow-sm';
        }
    };

    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center">
                <MenuIcon className="h-5 w-5 text-theme-muted" />
            </SheetTrigger>

            <SheetContent side="right" className="flex w-screen flex-col justify-between gap-0 border-none p-0 shadow-none">
                <nav className="h-full bg-theme/5">
                    {/* HEADER (kept your style) */}
                    <SheetHeader className="border-b border-white/10 bg-theme px-4 py-3 shadow-sm backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 p-2 shadow-inner backdrop-blur-sm">
                                <img src="/images/edec_globe.svg" alt="Earth Dreams Logo" className="h-full w-full object-contain" />
                            </div>

                            <div className="flex flex-col leading-tight text-white">
                                <p className="text-2xl font-bold tracking-wide">
                                    <span className="text-theme-accent">Earth</span> <span className="text-theme-secondary">Dreams</span>
                                </p>

                                <p className="text-[11px] text-white font-semibold tracking-wide">Education & Consultancy</p>
                            </div>
                        </div>
                    </SheetHeader>

                    <Separator />

                    {/* SCROLLABLE BODY */}
                    <div className="h-[calc(100vh-132px)] overflow-y-auto">
                        <div className="grid">
                            <Accordion value={accordionValue} onValueChange={setAccordionValue} type="single" collapsible className="w-full">
                                {/* Home */}
                                <Link href={route('public.index')}>
                                    <div className={cn(accordionTriggerClasses('item-0'))}>
                                        <LinkItem
                                            entity="Home"
                                            icon={
                                                <HomeIcon
                                                    className={cn(
                                                        'h-5 w-5 transition-all duration-300 ease-in-out',
                                                        accordionValue === 'item-0' ? 'text-white' : 'text-theme',
                                                    )}
                                                />
                                            }
                                            item="item-0"
                                            active={accordionValue}
                                        />
                                    </div>
                                </Link>

                                {/* Study in UK */}
                                <AccordionItem value="item-1" className="border-0">
                                    <AccordionTrigger className={cn(accordionTriggerClasses('item-1'), changeBackground('item-1'))}>
                                        <LinkItem
                                            entity="Study in UK"
                                            icon={
                                                <GraduationCapIcon
                                                    className={cn(
                                                        'h-5 w-5 transition-all duration-300 ease-in-out',
                                                        accordionValue === 'item-1' ? 'text-white' : 'text-theme',
                                                    )}
                                                />
                                            }
                                            item="item-1"
                                            active={accordionValue}
                                        />
                                    </AccordionTrigger>
                                    <AccordionContent className="border-b">
                                        <StudyInUKGridMobile />
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Universities */}
                                <AccordionItem value="item-2" className="border-0">
                                    <AccordionTrigger className={cn(accordionTriggerClasses('item-2'), changeBackground('item-2'))}>
                                        <LinkItem
                                            entity="Universities"
                                            icon={
                                                <LandmarkIcon
                                                    className={cn(
                                                        'h-5 w-5 transition-all duration-300 ease-in-out',
                                                        accordionValue === 'item-2' ? 'text-white' : 'text-theme',
                                                    )}
                                                />
                                            }
                                            item="item-2"
                                            active={accordionValue}
                                        />
                                    </AccordionTrigger>
                                    <AccordionContent className="border-b">
                                        <UniversitiesGridMobile />
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Courses */}
                                <AccordionItem value="item-3" className="border-0">
                                    <AccordionTrigger className={cn(accordionTriggerClasses('item-3'), changeBackground('item-3'))}>
                                        <LinkItem
                                            entity="Courses"
                                            icon={
                                                <AlbumIcon
                                                    className={cn(
                                                        'h-5 w-5 transition-all duration-300 ease-in-out',
                                                        accordionValue === 'item-3' ? 'text-white' : 'text-theme',
                                                    )}
                                                />
                                            }
                                            item="item-3"
                                            active={accordionValue}
                                        />
                                    </AccordionTrigger>
                                    <AccordionContent className="border-b">
                                        <CoursesGridMobile />
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Blogs */}

                                <Link href={route('public.blogs.index')}>
                                    <div className={cn(accordionTriggerClasses('item-4'))}>
                                        <LinkItem
                                            entity="Blogs & Events"
                                            icon={
                                                <NotebookPenIcon
                                                    className={cn(
                                                        'h-5 w-5 transition-all duration-300 ease-in-out',
                                                        accordionValue === 'item-4' ? 'text-white' : 'text-theme',
                                                    )}
                                                />
                                            }
                                            item="item-4"
                                            active={accordionValue}
                                        />
                                    </div>
                                </Link>

                                {/* CTA */}
                                <div className="px-4 pt-4 pb-6"></div>
                            </Accordion>
                        </div>
                    </div>
                </nav>

                {/* FOOTER (kept your style) */}
                <SheetFooter className="absolute bottom-0 grid w-full grid-cols-2 items-center justify-between bg-white px-4 py-3">
                    <SheetClose asChild>
                        <Link href={route('public.consultation.index')} className="w-full">
                            <Button className="group h-9 w-full rounded-3xl">
                                <span>Apply Now</span>
                                <ChevronRightIcon className="size-4 transform transition-all duration-200 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href={route('public.consultation.index')} className="w-full">
                            <Button variant={'secondary'} className="group h-9 w-full rounded-3xl">
                                <span>Free Consultation</span>
                            </Button>
                        </Link>
                    </SheetClose>
                    <span className="col-span-2 text-center text-xs text-gray-400">All rights reserved © 2023 Earth Dreams Education</span>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default NavMenuMobile;

function LinkItem({ entity, icon, item, active }: { icon: React.ReactNode; entity: string; item: string; active: string }) {
    return (
        <div
            className={cn(
                'flex w-fit items-center gap-3 bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-sm font-bold tracking-wide text-transparent transition-all duration-300 ease-in-out',
                active === item && 'bg-white',
            )}
        >
            {icon}
            <span className="capitalize">{entity}</span>
        </div>
    );
}

/** Wrappers to make your desktop grids behave on mobile */
function StudyInUKGridMobile() {
    return (
        <div className="[&_img]:h-12 [&_img]:w-12 [&>div]:w-full">
            <StudyInUKGrid />
        </div>
    );
}

function UniversitiesGridMobile() {
    return (
        <div className="[&_img]:h-12 [&_img]:w-12 [&>div]:w-full">
            <UniversitiesGrid />
        </div>
    );
}

function CoursesGridMobile() {
    return (
        <div className="[&_img]:h-12 [&_img]:w-12 [&>div]:w-full [&>div]:grid-cols-1">
            <CoursesGrid />
        </div>
    );
}
