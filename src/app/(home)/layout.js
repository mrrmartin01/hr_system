import Header from "@/components/header/header";


export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <div className="h-16" />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
