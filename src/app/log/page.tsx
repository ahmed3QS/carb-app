"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Edit2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function DailyLogPage() {
  const router = useRouter()
  const { currentUserUid, logs } = useStore()
  const [mounted, setMounted] = useState(false)

  useState(() => {
    setMounted(true)
  })

  // Prevent hydration errors
  if (!mounted) return null
  if (!currentUserUid) {
    if (typeof window !== 'undefined') router.push("/login")
    return null
  }

  const totalCarbs = logs.reduce((sum, item) => sum + item.carbs, 0)

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6">
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">السجل اليومي</h1>
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1 shadow-inner">
          <button className="p-2 hover:bg-background rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
          <div className="flex items-center gap-1.5 px-2 text-sm font-bold">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span>اليوم</span>
          </div>
          <button className="p-2 hover:bg-background rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-muted-foreground opacity-50" /></button>
        </div>
      </header>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex justify-between items-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -mr-5 -mt-5" />
        <span className="font-bold text-foreground text-lg relative z-10">مجموع اليوم:</span>
        <span className="text-3xl font-extrabold tracking-tight text-primary relative z-10">{totalCarbs} <span className="text-base font-medium text-muted-foreground mr-1">جم</span></span>
      </div>

      <div className="space-y-6">
        {["فطور", "غداء", "عشاء", "سناك"].map(mealType => {
          const mealLogs = logs.filter(l => l.mealType === mealType)
          if (mealLogs.length === 0) return null
          
          return (
            <div key={mealType} className="space-y-3">
              <h2 className="text-xl font-bold border-b border-border/50 pb-2 text-primary flex items-center gap-2">
                {mealType}
                <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto leading-tight">
                  {mealLogs.length} أصناف
                </span>
              </h2>
              <div className="space-y-3">
                {mealLogs.map(log => (
                  <Card key={log.id} className="border shadow-sm hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-foreground text-base">{log.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 font-medium bg-muted inline-block px-1.5 py-0.5 rounded">
                          {log.unit} • {log.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center bg-secondary/30 px-3 py-1.5 rounded-lg border border-primary/10">
                          <span className="font-bold text-xl text-primary block leading-none">{log.carbs}</span>
                          <span className="text-[10px] text-muted-foreground font-semibold">جم</span>
                        </div>
                        <div className="flex flex-col gap-2 border-r border-border pl-1 pr-3">
                          <button className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 p-1.5 rounded-md"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteDoc(doc(db, "users", currentUserUid, "logs", log.id))} className="text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 p-1.5 rounded-md"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
