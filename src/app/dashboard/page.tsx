"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, XCircle, Plus, Utensils } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()
  const { currentUserUid, profile, logs } = useStore()
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!currentUserUid) {
      router.push("/login")
    }
  }, [currentUserUid, router])

  if (!mounted || !currentUserUid) return null
  
  if (!profile) return null

  const currentCarbs = logs.reduce((sum: number, item: any) => sum + item.carbs, 0)
  const goal = profile.dailyGoal
  const percentage = Math.min((currentCarbs / goal) * 100, 100)
  
  let statusColor = "bg-success"
  let StatusIcon = CheckCircle2
  let statusText = "ممتاز"
  let statusTextColor = "text-success"

  if (currentCarbs > goal) {
    statusColor = "bg-destructive"
    StatusIcon = XCircle
    statusText = "يحتاج تعديل"
    statusTextColor = "text-destructive"
  } else if (currentCarbs > goal * 0.8) {
    statusColor = "bg-warning"
    StatusIcon = AlertTriangle
    statusText = "مرتفع"
    statusTextColor = "text-warning"
  }

  if (logs.length === 0) {
    return (
      <div className="container max-w-lg mx-auto p-4 pt-12 space-y-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-primary/20">
          <Utensils className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">لم تقم بتسجيل أي وجبة اليوم!</h2>
        <p className="text-muted-foreground max-w-[280px]">ابدأ يومك بتسجيل وجبتك الأولى لتتبع نسبة الكربوهيدرات الخاصة بك بسهولة.</p>
        <div className="w-full mt-8 max-w-[280px]">
          <Link href="/add" className="block w-full">
            <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform">
              إضافة وجبتك الأولى
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">مرحباً {profile.name} 👋</h1>
          <p className="text-muted-foreground">كيف حالك اليوم؟</p>
        </div>
      </header>

      {/* Progress Card */}
      <Card className="border-none shadow-md bg-gradient-to-br from-card to-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">الكربوهيدرات اليوم</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">{currentCarbs}</span>
                <span className="text-muted-foreground">/ {goal} جم</span>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 shadow-sm ${statusTextColor}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-sm font-bold">{statusText}</span>
            </div>
          </div>
          
          <Progress value={percentage} indicatorColor={statusColor} className="h-3 shadow-inner bg-black/5" />
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            {currentCarbs <= goal ? `متبقي لك ${goal - currentCarbs} جرام اليوم` : `لقد تجاوزت الهدف بـ ${currentCarbs - goal} جرام`}
          </p>
        </CardContent>
      </Card>

      {/* Meals Summary */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">وجبات اليوم</h2>
          <Link href="/log" className="text-sm text-primary font-medium hover:underline">السجل كامل</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {["فطور", "غداء", "عشاء", "سناك"].map(type => {
            const mealLogs = logs.filter((l: any) => l.mealType === type)
            if (mealLogs.length === 0) {
              return <MealSummaryCard key={type} title={type} carbs={0} time="--" isEmpty />
            }
            const totalCarbs = mealLogs.reduce((sum: number, l: any) => sum + l.carbs, 0)
            const latestTime = mealLogs[mealLogs.length - 1].time
            return <MealSummaryCard key={type} title={type} carbs={totalCarbs} time={latestTime} />
          })}
        </div>
      </div>

      {/* Sticky Mobile Add Button - Visual only, handled securely by BottomNav too, but prominent here */}
      <div className="hidden md:flex justify-end pt-4">
        <Link href="/add" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg shadow-primary/25 font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          إضافة وجبة
        </Link>
      </div>
    </div>
  )
}

function MealSummaryCard({ title, carbs, time, isEmpty = false }: { title: string, carbs: number, time: string, isEmpty?: boolean }) {
  if (isEmpty) {
    return (
      <Link href={`/add?type=${title}`}>
        <Card className="h-full border-dashed border-2 bg-transparent hover:bg-muted/50 transition-colors cursor-pointer group">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full text-muted-foreground gap-2 min-h-[100px]">
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform text-primary/50" />
            <span className="font-medium text-sm">أضف {title}</span>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
      <CardContent className="p-4 min-h-[100px] flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold text-primary">{carbs}</span>
          <span className="text-sm font-medium text-muted-foreground mb-1">جم</span>
        </div>
      </CardContent>
    </Card>
  )
}
