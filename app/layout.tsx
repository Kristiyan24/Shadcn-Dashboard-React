import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AppSidebar from "@/components/common/AppSidebar";
import AppNavbar from "@/components/common/AppNavbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Dashboard",
  description: "Shadcn Dashboard Project",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"



  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar/>
              <main className="w-full">
              <AppNavbar/>
              <div className="px-4">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
