"use client"

import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="container max-w-sm mx-auto p-4 min-h-[80vh] flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/20">
          <Apple className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">حاسب الكربوهيدرات</h1>
        <p className="text-muted-foreground font-medium text-[15px]">أداة بسيطة لمساعدتك على تتبع نظامك الغذائي بسهولة وبدون تعقيد.</p>
      </div>

      <div className="w-full mt-8">
        <div className="space-y-3 w-full backdrop-blur-sm">
          <Link href="/login" className="block w-full">
            <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/signup" className="block w-full">
            <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-xl border-border shadow-sm hover:bg-muted transition-all bg-card">
              تسجيل جديد
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-8 w-full">
        <Link href="/subscribe" className="inline-block px-4 py-2 rounded-lg bg-secondary/50 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors flex justify-center items-center gap-2 mx-auto">
          اشتراك شهري - 20 ريال
        </Link>
      </div>
    </div>
  )
}
