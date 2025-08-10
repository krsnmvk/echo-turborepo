'use client';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@workspace/ui/components/sidebar';
import { cn } from '@workspace/ui/lib/utils';
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  MicIcon,
  PaletteIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const customerSuportItems = [
  {
    title: 'Conversations',
    url: '/conversations',
    icon: InboxIcon,
  },
  {
    title: 'Knowlge Base',
    url: '/files',
    icon: LibraryBigIcon,
  },
];

const configurationItems = [
  {
    title: 'Widget Customization',
    url: '/customization',
    icon: PaletteIcon,
  },
  {
    title: 'Integrations',
    url: '/integrations',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Voice Assistant',
    url: '/plugins/vapi',
    icon: MicIcon,
  },
];

const accountItems = [
  {
    title: 'Plans & Billing',
    url: '/billing',
    icon: CreditCardIcon,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  function isActivePath(url: string) {
    if (url === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(url);
  }

  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: 'w-full! h-8!',
                    avatarBox: 'size-5! rounded-sm!',
                    organizationSwitcherTrigger:
                      'w-full! justify-start! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
                    organizationPreview:
                      'group-data-[collapsible=icon]:justify-center! gap-2!',
                    organizationPreviewTextContainer:
                      'group-data-[collapsible=icon]:hidden! text-sm! font-medium! text-sidebar-foreground!',
                    organizationSwitcherTriggerIcon:
                      'group-data-[collapsible=icon]:hidden! ml-auto! text-sidebar-foreground!',
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerSuportItems.map(({ icon: Icon, title, url }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    isActive={isActivePath(url)}
                    tooltip={title}
                    className={cn(
                      isActivePath(url) &&
                        'bg-gradient-to-b from-sidebar-primary! to-[#0b63f3]! text-secondary-foreground! hover:to-[#0b63f3]/90!'
                    )}
                    asChild
                  >
                    <Link href={url}>
                      <Icon className="size-4" />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configurationItems.map(({ icon: Icon, title, url }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    isActive={isActivePath(url)}
                    tooltip={title}
                    asChild
                  >
                    <Link href={url}>
                      <Icon className="size-4" />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map(({ icon: Icon, title, url }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    isActive={isActivePath(url)}
                    tooltip={title}
                    asChild
                  >
                    <Link href={url}>
                      <Icon className="size-4" />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: 'w-full! h-8!',
                  userButtonTrigger:
                    'w-full! p-2! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:text-sidebar-accent-foreground! hover:bg-sidebar-accent!',
                  userButtonBox:
                    'w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!',
                  userButtonOuterIdentifier:
                    'pl-0! group-data-[collapsible=icon]:hidden!',
                  avatarBox: 'size-5!',
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
