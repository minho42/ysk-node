import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "🇦🇺 AUD → 🇰🇷 KRW money transfer services",
  description: "🇦🇺 AUD → 🇰🇷 KRW money transfer services",
};

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-center bg-white h-16 mb-3 px-4 sm:px-6">
      <div className="flex w-full items-center justify-between h-full">
        <div className="flex flex-grow justify-start text-xl font-semibold">
          <Link href="/">YSK: AUD → KRW</Link>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2">
            <a
              className="underline text-sm"
              href="https://twitter.com/minho42_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
