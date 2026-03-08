import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIRE | AI Transaction Concierge",
  description: "AI-assisted real estate transaction concierge starter app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="nav-inner">
            <Link href="/" style={{ fontWeight: 800 }}>AIRE</Link>
            <nav className="nav-links">
              <Link href="/intake">Readiness Report</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
