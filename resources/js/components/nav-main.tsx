import { NavRouteNameItem } from '@/components/app-sidebar';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useRoles } from '@/hooks/use-roles';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavRouteNameItem[] | NavItem[] }) {
    const page = usePage();

    const hasRouteName = (item: NavItem | NavRouteNameItem): item is NavRouteNameItem => {
        return 'routeName' in item && typeof (item as NavRouteNameItem).routeName === 'string';
    };

    const { isAdmin } = useRoles();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items
                    .filter((item) => item.title !== 'Users')
                    .map((item) => {
                        let active: boolean;
                        let link: string;

                        if (hasRouteName(item)) {
                            active = route().current(item.routeName);
                            link = route(item.routeName);
                        } else {
                            active = page.url.startsWith(item.href);
                            link = item.href;
                        }

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={active} tooltip={{ children: item.title }}>
                                    <Link href={link} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}

                {isAdmin &&
                    items
                        .filter((item) => item.title === 'Users')
                        .map((item) => {
                            let active: boolean;
                            let link: string;

                            if (hasRouteName(item)) {
                                active = route().current(item.routeName);
                                link = route(item.routeName);
                            } else {
                                active = page.url.startsWith(item.href);
                                link = item.href;
                            }

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={active} tooltip={{ children: item.title }}>
                                        <Link href={link} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
