"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Star, ShieldCheck, XCircle } from "lucide-react"

export default function SubscribePage() {
  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6 pb-24">
      <header className="text-center space-y-2 mb-6">
        <div className="inline-flex bg-primary/10 p-3 rounded-full mb-2">
          <Star className="w-8 h-8 text-warning fill-warning" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">اشتراك شهري</h1>
        <p className="text-muted-foreground font-medium px-4">افتح كل المميزات المتقدمة وتعرّف على تفاصيل نظامك بدقة.</p>
      </header>

      <Card className="border-2 border-primary shadow-xl shadow-primary/10 relative overflow-hidden bg-gradient-to-br from-card to-primary/5">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
          النسخة المدفوعة
        </div>
        <CardHeader className="text-center pb-4 pt-8">
          <CardTitle className="text-lg font-bold text-muted-foreground">الباقة المميزة</CardTitle>
          <div className="mt-4 flex justify-center items-baseline gap-1">
            <span className="text-5xl font-extrabold text-primary">20</span>
            <span className="text-lg font-bold text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-md">ريال / شهر</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pt-2">
          <ul className="space-y-4">
            {[
              'التقارير الأسبوعية',
              'متوسط الكربوهيدرات اليومي',
              'أكثر الأطعمة استخداماً',
              'مزايا قادمة عديدة'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 bg-background/50 p-2 rounded-lg border border-border/50 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 bg-primary/10 rounded-full p-0.5" />
                <span className="text-[15px] font-semibold text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-4 flex flex-col gap-3">
          <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform bg-primary">
            اشترك الآن
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium mt-2">
            <ShieldCheck className="w-4 h-4" />
            <span>مدفوعات آمنة وموثوقة</span>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-10 mb-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-center font-bold text-lg mb-4 text-muted-foreground">النسخة المجانية تشمل:</h3>
        <ul className="space-y-3 opacity-80">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground">قاعدة بيانات الأطعمة الأساسية</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground">تسجيل الوجبات وحساب الكربوهيدرات</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground">تتبع هدفك اليومي فقط</span>
          </li>
          <li className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-muted-foreground/50 shrink-0" />
            <span className="text-sm font-medium text-muted-foreground line-through">التقارير المتقدمة</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
