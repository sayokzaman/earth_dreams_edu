import NavMenuMobile from '@/components/nav-menu-mobile';
import NavMenuPC from '@/components/nav-menu-pc';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const NavPublic = ({ changeBackground }: { changeBackground?: boolean }) => {
    const currentRoute = route().current();

    return (
        <>
            <div
                className={cn(
                    'fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between pr-6 pl-5 tracking-wide transition-colors duration-200 ease-in-out sm:px-10 xl:px-52',
                    currentRoute !== 'public.index' || changeBackground ? 'bg-theme shadow-md backdrop-blur-md' : 'bg-transparent',
                )}
            >
                <Link href={route('public.index')} className="h-full py-4 sm:py-3.5">
                    <img src="/images/edec.svg" alt="Logo" className="h-full object-contain" />
                </Link>

                <div className="hidden lg:block">
                    <NavMenuPC />
                </div>

                <div className="block lg:hidden">
                    <NavMenuMobile />
                </div>
            </div>
        </>
    );
};

export default NavPublic;
