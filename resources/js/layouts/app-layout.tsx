import { SetPasswordDialog } from '@/components/set-password-dialog';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<SharedData>().props;

    console.log('User in AppLayout:', auth.user);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            {!auth.user.set_password ? <SetPasswordDialog /> : null}
        </AppLayoutTemplate>
    );
};
