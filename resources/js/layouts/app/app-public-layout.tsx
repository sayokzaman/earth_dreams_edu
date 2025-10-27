import Footer from '@/components/footer';
import NavPublic from '@/components/nav-public';
import NewsLetter from '@/components/news-letter';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const AppPublicLayout = ({ children, changeBackground }: PropsWithChildren & { changeBackground?: boolean }) => {
    const currentRoute = route().current();

    return (
        <div className="flex min-h-screen flex-col justify-between">
            {/* Navigation */}
            <NavPublic changeBackground={changeBackground} />

            {/* Content */}
            <main className={cn('flex-1', currentRoute !== 'public.index' ? 'mt-20' : '')}>{children}</main>

            <div>
                <NewsLetter />

                <Footer />
            </div>
        </div>
    );
};

export default AppPublicLayout;
