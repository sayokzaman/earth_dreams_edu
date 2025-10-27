import Footer from '@/components/footer';
import NavPublic from '@/components/nav-public';
import NewsLetter from '@/components/news-letter';
import { PropsWithChildren } from 'react';

const AppPublicLayout = ({ children, changeBackground }: PropsWithChildren & { changeBackground?: boolean }) => {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            {/* Navigation */}
            <NavPublic changeBackground={changeBackground} />

            {/* Content */}
            <main>{children}</main>

            <div>
                <NewsLetter />

                <Footer />
            </div>
        </div>
    );
};

export default AppPublicLayout;
