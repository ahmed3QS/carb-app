"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function OnboardingPage() {
  const router = useRouter()
  const { currentUserUid } = useStore()
  const [name, setName] = useState("")
  const [goal, setGoal] = useState<number[]>([150])
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!currentUserUid) return
    setIsSaving(true)
    try {
      await setDoc(doc(db, "users", currentUserUid), { name: name.trim() || "مستخدم", dailyGoal: goal[0] }, { merge: true })
      router.push("/dashboard")
    } catch {
      setIsSaving(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto p-4 pt-12 flex flex-col gap-6">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-primary mb-2">أهلاً بك</h1>
        <p className="text-muted-foreground">لنقم بإعداد ملفك الشخصي</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المعلومات الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم (اختياري)</Label>
            <Input 
              id="name" 
              placeholder="مثال: أحمد" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>الهدف اليومي (جرام كربوهيدرات)</Label>
              <span className="font-bold text-primary">{goal[0]} جم</span>
            </div>
            <Slider 
              value={goal}
              onValueChange={setGoal}
              max={300}
              min={50}
              step={5}
              className="py-4"
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground text-center">
              يمكنك تعديل هذا الهدف لاحقاً من الإعدادات
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button onClick={handleSave} disabled={isSaving} className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
          {isSaving ? "جاري الحفظ..." : "أوافق، لنبدأ"}
        </Button>
      </div> // eslint-ignore-error
    </div>
  )
}
