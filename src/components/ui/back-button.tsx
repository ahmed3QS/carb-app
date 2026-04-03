"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function BackButton() {
  const router = useRouter()
  return (
    <button 
      onClick={() => router.back()} 
      className="p-2 rounded-full hover:bg-muted transition-colors active:scale-95 shrink-0"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  )
}
