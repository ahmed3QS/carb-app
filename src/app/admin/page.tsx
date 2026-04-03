"use client"

import { useState } from "react"
import { Lock, Database, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [isAdmin] = useState(true)

  if (!isAdmin) {
    return (
      <div className="container max-w-lg mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="bg-destructive/10 p-4 rounded-full">
          <Lock className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-xl font-bold">غير مصرح لك بالدخول</h1>
        <p className="text-muted-foreground text-sm max-w-xs">هذه الصفحة مخصصة لمدراء التطبيق فقط. يرجى تسجيل الدخول بحساب مسؤول.</p>
      </div>
    )
  }

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6 pb-24">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Database className="w-6 h-6 text-primary" />
          </div>
          لوحة التحكم (Admin)
        </h1>
        <p className="text-muted-foreground font-medium text-sm">إدارة قاعدة بيانات الأطعمة والمستخدمين</p>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-md">
          <CardContent className="p-4 flex flex-col gap-1 text-center">
            <span className="text-xs font-semibold opacity-80">عدد الأطعمة</span>
            <span className="text-3xl font-extrabold">100</span>
          </CardContent>
        </Card>
        <Card className="bg-teal-600 text-white border-none shadow-md">
          <CardContent className="p-4 flex flex-col gap-1 text-center">
            <span className="text-xs font-semibold opacity-80">مستخدمين نشطين</span>
            <span className="text-3xl font-extrabold">1,204</span>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-bold text-lg mb-2">إدارة قاعدة البيانات</h2>
          <Button variant="outline" className="w-full justify-start h-12 font-bold px-4 hover:border-primary">
            تحديث منتجات السوبر ماركت
          </Button>
          <Button variant="outline" className="w-full justify-start h-12 font-bold px-4 hover:border-primary">
            إضافة طعام جديد
          </Button>
          <Button variant="default" className="w-full justify-center h-12 font-bold px-4 text-base shadow-lg mt-4">
            تشغيل سكريبت Seed (لجميع الأطعمة)
          </Button>
        </CardContent>
      </Card>

      <div className="pt-4">
        <h2 className="font-bold text-lg mb-3">البحث في المستخدمين</h2>
        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="البحث عبر الايميل..." 
            className="pl-3 pr-10 rounded-xl h-12 shadow-sm text-base bg-card"
          />
        </div>
      </div>
    </div>
  )
}
