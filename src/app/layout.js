import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme/theme-provider";
import { AuthProvider } from "./api/auth/sessionProvider";

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
  title: "Warlock HRMS",
  description:
    "The homepage of the Warlock HRMS. A comprehensive solution for managing employees, payroll, performance and more.",
  icons: {
    icon: "/logo.png",
  },
  keywords:
    "Warlock, HRMS, Human Resource Management System, payroll, performance, employee management",
};

export default async function RootLayout({ children }) {
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
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
