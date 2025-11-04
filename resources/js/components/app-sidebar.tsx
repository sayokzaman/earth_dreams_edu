import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FileUserIcon, LandmarkIcon, LayoutGrid, NotebookPen } from 'lucide-react';
import AppLogo from './app-logo';

export interface NavRouteNameItem extends NavItem {
    routeName: string;
}

const mainNavItems: NavRouteNameItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        routeName: 'dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Universities',
        href: '/universities',
        routeName: 'admin.universities.index',
        icon: LandmarkIcon,
    },
    {
        title: 'Blogs',
        href: '/blogs',
        routeName: 'admin.blogs.index',
        icon: NotebookPen,
    },
    {
        title: 'Leads',
        href: '/leads',
        routeName: 'admin.leads.index',
        icon: FileUserIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
