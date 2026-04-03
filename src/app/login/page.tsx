"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Lock, Mail, WifiOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTestMode, setIsTestMode] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور")
      return
    }
    
    setIsLoading(true)
    try {
      console.log("Attempting to login with:", email);
      await signInWithEmailAndPassword(auth, email, password)
      console.log("Login successful!");
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Firebase Login Error Details:", err.code, err.message, err)
      
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      } else if (err.code === "auth/network-request-failed") {
        setError("⚠️ تأكد من اتصال الإنترنت أو إعدادات Firebase (Network Request Failed)")
      } else {
        setError(`حدث خطأ أثناء محاولة تسجيل الدخول: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setError("")
    setIsTestMode(true)
    try {
      console.log("Testing Firebase Connection (Anonymous Login)...");
      await signInAnonymously(auth)
      console.log("Anonymous Login Test Successful!");
      setError("✅ نجاح: تم الاتصال بـ Firebase بنجاح (تسجيل دخول مجهول)")
    } catch (err: any) {
      console.error("Firebase Test Connection Error:", err.code, err.message, err)
      if (err.code === "auth/network-request-failed") {
        setError("⚠️ تأكد من اتصال الإنترنت أو إعدادات Firebase (فشل الطلب)")
      } else if (err.code === "auth/operation-not-allowed") {
        setError("⚠️ الاتصال ناجح، ولكن Anonymous Auth غير مفعل في Firebase.")
      } else {
        setError(`خطأ أثناء الاختبار: ${err.message}`)
      }
    } finally {
      setIsTestMode(false)
    }
  }

  return (
    <div className="container max-w-sm mx-auto p-4 min-h-[85vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Apple className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
        <p className="text-muted-foreground mt-2">مرحباً بعودتك إلى حاسب الكربوهيدرات</p>
      </div>

      <Card className="border shadow-lg mb-4">
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className={`p-3 rounded-lg text-center text-sm font-bold ${error.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-destructive/10 text-destructive'}`}>
                {error}
              </div>
            )}
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
              <div className="flex justify-between items-center">
                <Label>كلمة المرور</Label>
              </div>
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

            <Button type="submit" disabled={isLoading || isTestMode} className="w-full h-12 text-md font-bold mt-2">
              {isLoading ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleTestConnection}
        disabled={isLoading || isTestMode}
        className="w-full text-foreground/70"
      >
        <WifiOff className="w-4 h-4 ml-2" />
        {isTestMode ? "جاري اختبار الاتصال..." : "اختبار اتصال Firebase"}
      </Button>

      <p className="text-center mt-8 text-sm text-muted-foreground">
        ليس لديك حساب؟ {" "}
        <Link href="/signup" className="text-primary font-bold hover:underline">
          تسجيل جديد
        </Link>
      </p>
    </div>
  )
}
