"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Activity, TrendingDown, Crown } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

export default function ReportsPage() {
  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6 pb-24">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BackButton />
          <div className="bg-primary/10 p-2 rounded-xl">
            <BarChart2 className="w-6 h-6 text-primary" />
          </div>
          التقارير
        </h1>
        <p className="text-muted-foreground font-medium text-sm">ملخص استهلاكك للكربوهيدرات لآخر 7 أيام.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="bg-card shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1 text-center">
            <span className="text-xs text-muted-foreground font-bold">المتوسط اليومي</span>
            <span className="text-3xl font-extrabold text-foreground">115 <span className="text-sm font-medium text-muted-foreground">جم</span></span>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1 text-center">
            <span className="text-xs text-muted-foreground font-bold">أيام التسجيل</span>
            <span className="text-3xl font-extrabold text-foreground">6 <span className="text-sm font-medium text-muted-foreground">أيام</span></span>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            الرسم البياني للأسبوع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full bg-secondary/20 rounded-xl flex items-end justify-between p-4 pt-8 gap-2 border border-dashed border-border/50">
            {/* Mock Chart Bars */}
            {[120, 140, 90, 150, 110, 130, 80].map((val, i) => (
              <div key={i} className="flex flex-col items-center justify-end w-full h-full gap-2 relative group">
                <span className="text-[10px] font-bold text-muted-foreground absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                <div 
                  className={`w-full max-w-[30px] rounded-t-sm transition-all duration-500 ${val > 140 ? 'bg-destructive/80' : 'bg-primary'}`} 
                  style={{ height: `${(val / 150) * 100}%` }}
                />
                <span className="text-[10px] font-bold text-muted-foreground">يوم {i+1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
        <CardHeader className="pb-3 bg-primary/5">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              الأطعمة الأكثر استهلاكاً
            </span>
            <Crown className="w-5 h-5 text-warning" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {['رز أبيض مطبوخ', 'تمر خلاص', 'خبز أسمر', 'حليب كامل الدسم'].map((food, i) => (
              <div key={i} className="flex justify-between items-center p-4 hover:bg-muted/30 transition-colors">
                <span className="font-bold text-sm flex items-center gap-3">
                  <span className="bg-background shadow-sm w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-muted-foreground border">{i+1}</span>
                  {food}
                </span>
                <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">{(4 - i) * 3} مرات</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center pt-4">
         <p className="text-xs text-muted-foreground font-medium">التقارير المتقدمة تتطلب اشتراك <a href="/subscribe" className="text-primary underline">النسخة المدفوعة</a></p>
      </div>
    </div>
  )
}
