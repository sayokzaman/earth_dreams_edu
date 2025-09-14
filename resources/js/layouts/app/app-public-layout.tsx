import NavPublic from '@/components/nav-public';
import { PropsWithChildren } from 'react';

const AppPublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            {/* Navigation */}
            <NavPublic />

            {/* Content */}
            <main className="mt-20">{children}</main>
        </>
    );
};

export default AppPublicLayout;
