import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/providers/AuthProvider";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "حاسب الكربوهيدرات",
  description: "تطبيق لحساب الكربوهيدرات في الوجبات اليومية - لأغراض تعليمية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-tajawal antialiased min-h-screen bg-background text-foreground flex flex-col`}>
        <AuthProvider>
          <main className="flex-1 pb-20 relative z-0">
            {children}
          </main>

        </AuthProvider>
      </body>
    </html>
  );
}
