import localFont from "next/font/local";
import "./globals.css";
import CustomProvider from "@/store/provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SessionSync from "@/store/sessionsync";
import { ThemeProvider } from "@/context/theme/theme-provider";
import Header from "@/components/header/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OptiCare",
  description:
    "The homepage of the OptiCare HRMS. A comprehensive solution for managing employees, payroll, performance and more.",
  icons: {
    icon: "/logo.png",
  },
  keywords:
    "OptiCare, HRMS, Human Resource Management System, payroll, performance, employee management",
  
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomProvider session={session}>
            <SessionSync />
            <Header />
            <div className="h-16" />
            <main className="overflow-x-hidden">{children}</main>
          </CustomProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
