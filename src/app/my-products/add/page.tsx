"use client"

import { useState } from "react"
import { ArrowRight, PackagePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"

export default function AddCustomProduct() {
  const [name, setName] = useState("")
  const [carbs, setCarbs] = useState("")
  const [type, setType] = useState<"100g" | "serving">("100g")
  const [servingSize, setServingSize] = useState("")

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6">
      <header className="flex items-center gap-3 mb-6">
        <BackButton />
        <h1 className="text-xl font-bold flex items-center gap-2">
          إضافة منتج خاص
          <PackagePlus className="w-5 h-5 text-primary" />
        </h1>
      </header>

      <div className="bg-warning/10 border border-warning/20 p-4 rounded-xl text-sm leading-relaxed mb-6 font-medium">
        ⚠️ يرجى إدخال القيم بدقة من <strong>البطاقة الغذائية</strong> الموجودة على عبوة المنتج لضمان صحة الحسابات.
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName" className="font-bold text-base">اسم المنتج</Label>
            <Input 
              id="productName"
              placeholder="مثال: خبز برجر بروتين" 
              className="h-12 text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="font-bold text-base">نوع القيمة المدخلة</Label>
            <div className="flex gap-2">
              <Button 
                variant={type === "100g" ? "default" : "outline"} 
                className="flex-1 font-bold"
                onClick={() => setType("100g")}
              >
                لكل 100 جرام
              </Button>
              <Button 
                variant={type === "serving" ? "default" : "outline"} 
                className="flex-1 font-bold"
                onClick={() => setType("serving")}
              >
                لكل حصة / عبوة
              </Button>
            </div>
          </div>

          {type === "serving" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label htmlFor="servingSize" className="font-bold text-base">وزن الحصة (بالجرام)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="servingSize"
                  type="number"
                  placeholder="مثال: 50" 
                  className="h-12 text-base text-left rounded-l-none"
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                  dir="ltr"
                />
                <span className="bg-muted text-muted-foreground font-bold px-4 py-3 rounded-l-md border border-r-0 h-12 flex items-center">جرام</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="carbs" className="font-bold text-base">كمية الكربوهيدرات</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="carbs"
                type="number"
                placeholder="0.0" 
                className="h-12 text-base text-left rounded-l-none border-primary/50 focus-visible:ring-primary"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                dir="ltr"
              />
              <span className="bg-primary/10 text-primary font-bold px-4 py-3 rounded-l-md border border-primary/20 border-r-0 h-12 flex items-center">جرام</span>
            </div>
          </div>
          
          <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-md mt-6" disabled={!name || !carbs || (type === 'serving' && !servingSize)}>
            حفظ المنتج
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}
