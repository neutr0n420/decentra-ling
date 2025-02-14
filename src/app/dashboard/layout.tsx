import { AppSidebar } from "@/components/app-sidebar";
import DashboardNavbar from "@/components/dash-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen">
                <DashboardNavbar />
                {/* <SidebarTrigger /> */}
                {children}
            </main>
        </SidebarProvider>
    )
}