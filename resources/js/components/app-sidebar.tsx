import { Link, usePage } from '@inertiajs/react';
import { Folder, LayoutGrid, ShoppingCart, MessageSquare, ShoppingBag } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import type { Auth } from '@/types';
import AppLogo from './app-logo';
import { useCart } from '@/hooks/use-cart';

function useNavItems() {
    const { auth } = usePage().props as unknown as { auth: Auth };
    const { totalItems } = useCart();

    const items: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    if (auth?.user?.is_farmer) {
        items.push({
            title: 'Produce',
            href: '/farmer/produce',
            icon: Folder,
        });
        items.push({
            title: 'Orders',
            href: '/farmer/orders',
            icon: ShoppingCart,
        });
    }

    if (auth?.user?.is_consumer) {
        items.push({
            title: 'Produces',
            href: '/consumer/produce',
            icon: Folder,
        });
        items.push({
            title: 'Cart',
            href: '/consumer/cart',
            icon: ShoppingBag,
            badge: totalItems > 0 ? totalItems.toString() : undefined,
        });
        items.push({
            title: 'Orders',
            href: '/consumer/orders',
            icon: ShoppingCart,
        });
    }

    if (auth?.user?.is_admin) {
        items.push({
            title: 'Conversations',
            href: '/messages',
            icon: MessageSquare,
        });
    }

    if (auth?.user && !auth?.user?.is_admin) {
        items.push({
            title: 'Messages',
            href: '/messages',
            icon: MessageSquare,
            badge: auth.user.unread_count > 0 ? auth.user.unread_count.toString() : undefined,
        });
    }

    return items;
}


export function AppSidebar() {
    const navItems = useNavItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
