export const dynamic = 'force-dynamic'

import { Suspense } from "react"
import ClientAddMealPage from "./ClientPage"

export default function AddMealPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse font-bold">جاري تحميل البيانات...</div>}>
      <ClientAddMealPage />
    </Suspense>
  )
}
