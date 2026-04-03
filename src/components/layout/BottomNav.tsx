"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, ShoppingCart, BarChart2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background flex justify-around items-center h-16 z-50 pb-[env(safe-area-inset-bottom)]">
      <Link href="/dashboard" className={cn("flex flex-col items-center gap-1 text-[10px]", pathname === "/dashboard" ? "text-primary" : "text-muted-foreground")}>
        <Home className="w-6 h-6" />
        الرئيسية
      </Link>
      <Link href="/supermarket" className={cn("flex flex-col items-center gap-1 text-[10px]", pathname === "/supermarket" ? "text-primary" : "text-muted-foreground")}>
        <ShoppingCart className="w-6 h-6" />
        السوبر ماركت
      </Link>
      <Link href="/add" className="relative -top-5 flex flex-col items-center">
        <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <Plus className="w-8 h-8" />
        </div>
        <span className="text-[10px] mt-1 font-medium text-foreground">إضافة</span>
      </Link>
      <Link href="/reports" className={cn("flex flex-col items-center gap-1 text-[10px]", pathname === "/reports" ? "text-primary" : "text-muted-foreground")}>
        <BarChart2 className="w-6 h-6" />
        تقارير
      </Link>
      <Link href="/subscribe" className={cn("flex flex-col items-center gap-1 text-[10px]", pathname === "/subscribe" ? "text-primary" : "text-muted-foreground")}>
        <User className="w-6 h-6" />
        حسابي
      </Link>
    </nav>
  );
}
