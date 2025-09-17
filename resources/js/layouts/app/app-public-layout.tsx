import Footer from '@/components/footer';
import NavPublic from '@/components/nav-public';
import NewsLetter from '@/components/news-letter';
import { PropsWithChildren } from 'react';

const AppPublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            {/* Navigation */}
            <NavPublic />

            {/* Content */}
            <main className="mt-20">{children}</main>

            <div>
                <NewsLetter />

                <Footer />
            </div>
        </div>
    );
};

export default AppPublicLayout;
