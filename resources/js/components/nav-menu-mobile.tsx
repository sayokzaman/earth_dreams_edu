import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon, MenuIcon } from 'lucide-react';

const NavMenuMobile = () => {
    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center">
                <MenuIcon className="h-6 w-6 text-theme-muted" />
            </SheetTrigger>
            <SheetContent className="flex w-10/12 flex-col gap-0 border-none shadow-none">
                <SheetHeader className="h-20 justify-center gap-0 bg-theme px-4 py-0">
                    <div className="flex items-center gap-2.5">
                        <img src="/images/edec_globe.svg" alt="" className="h-fit w-18" />
                        <Separator orientation="vertical" className="h-10" />
                        <div className="flex flex-col gap-0.5 font-semibold tracking-wide text-white">
                            <p>Welcome!</p>
                            <p>Earth Dreams Education</p>
                        </div>
                    </div>
                </SheetHeader>
                <div className="grid">
                    <Accordion type="single" collapsible className="w-full px-4">
                        <Link href="/" className="flex flex-1 items-center justify-between border-b py-3 font-medium transition-all hover:underline">
                            Home
                        </Link>

                        <AccordionItem value="item-1">
                            <AccordionTrigger className="py-3">Study in UK</AccordionTrigger>
                            <AccordionContent className="flex flex-col pb-2 font-medium">
                                <Link className="border-b py-2 pl-4">Link1</Link>
                                <Link className="py-2 pl-4">Link2</Link>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="py-3">Universities</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="py-3">Courses</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className="py-3">Pathway</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger className="py-3">Blogs</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>

                        <Link
                            href="/"
                            className="flex flex-1 items-center border-b py-3 font-medium text-theme-accent transition-all hover:underline"
                        >
                            <span>Apply Now</span>
                            <ChevronRightIcon className="ml-2 size-4 transform transition-all duration-200 group-hover:translate-x-1" />
                        </Link>
                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NavMenuMobile;
