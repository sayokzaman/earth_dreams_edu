import NavMenuMobile from '@/components/nav-menu-mobile';
import NavMenuPC from '@/components/nav-menu-pc';
import { Link } from '@inertiajs/react';

const NavPublic = () => {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-theme pr-6 pl-5 tracking-wide sm:px-10 xl:px-52 shadow-2xl">
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
