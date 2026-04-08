"use client";
import AdminBranches from "@/components/AdminBranches";
import AdminChangePassword from "@/components/AdminChangePassword";
import AdminContact from "@/components/AdminContact";
import AdminDashboard from "@/components/AdminDashboard";
import AdminEventregistrant from "@/components/AdminEventregistrant";
import AdminEvents from "@/components/AdminEvents";
import AdminGallery from "@/components/AdminGallery";
import AdminMenu from "@/components/AdminMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/constants";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Dashboard() {
  const [selectedBar, setSelectedBar] = useState<string>("Dashboard");
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-white/10 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950">
        <SidebarHeader className="py-6">
          <div className="flex items-center gap-3 justify-center h-full">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-xl" />
              <Icon
                icon="glyphs-poly:building"
                className="w-12 h-12 text-amber-400 relative z-10 drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Cafi Cafe
              </h2>
              <p className="text-xs text-amber-400/80 font-medium tracking-wide">
                Admin Panel
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator className="bg-white/10" />
        <SidebarContent className="mt-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem
                    key={item.id}
                    className="group relative mx-2 rounded-lg transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 rounded-lg group-hover:from-amber-500/10 group-hover:via-amber-500/5 group-hover:to-transparent transition-all duration-300" />
                    <SidebarMenuButton
                      onClick={() => setSelectedBar(item.name)}
                      className="relative w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-all duration-200 group-hover:shadow-lg"
                    >
                      <div className="relative">
                        <Icon
                          icon={item.icon}
                          className="w-5 h-5 transition-all duration-200 group-hover:scale-110 group-hover:text-amber-400"
                        />
                        <div className="absolute inset-0 bg-amber-400/0 rounded-full blur-md group-hover:bg-amber-400/30 transition-all duration-300" />
                      </div>
                      <span className="font-medium text-sm tracking-wide">
                        {item.name}
                      </span>
                      <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Icon
                          icon="lucide:chevron-right"
                          className="w-4 h-4 text-amber-400"
                        />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col gap-10 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <SidebarSeparator orientation="vertical" />
          <p>{selectedBar}</p>
        </div>
        {selectedBar === "Dashboard" ? (
          <AdminDashboard />
        ) : selectedBar === "Update Password" ? (
          <AdminChangePassword />
        ) : selectedBar === "Event Registrants" ? (
          <AdminEventregistrant />
        ) : selectedBar === "Menu" ? (
          <AdminMenu />
        ) : selectedBar === "Events" ? (
          <AdminEvents />
        ) : selectedBar === "Branches" ? (
          <AdminBranches />
        ) : selectedBar === "Gallery" ? (
          <AdminGallery />
        ) : selectedBar === "Contact" ? (
          <AdminContact />
        ) : null}
      </SidebarInset>
    </SidebarProvider>
  );
}
