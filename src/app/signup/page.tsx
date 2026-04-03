"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Apple, Lock, Mail, User } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password || !name) {
      setError("جميع الحقول مطلوبة")
      return
    }

    setIsLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", user.uid), {
        name,
        dailyGoal: 150
      })
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/email-already-in-use") {
        setError("البريد الإلكتروني مسجل مسبقاً")
      } else if (err.code === "auth/weak-password") {
        setError("كلمة المرور ضعيفة جداً")
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-sm mx-auto p-4 min-h-[85vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Apple className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">تسجيل جديد</h1>
        <p className="text-muted-foreground mt-2">انضم إلينا وابدأ بتتبع نظامك الغذائي</p>
      </div>

      <Card className="border shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm font-bold p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label>الاسم</Label>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="أحمد"
                  className="pr-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <User className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <div className="relative">
                <Input 
                  type="email" 
                  dir="ltr"
                  placeholder="example@mail.com"
                  className="pr-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>كلمة المرور</Label>
              <div className="relative">
                <Input 
                  type="password" 
                  dir="ltr"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 text-md font-bold mt-2">
              {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center mt-8 text-sm text-muted-foreground">
        لديك حساب بالفعل؟ {" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  )
}
