"use client"

import { useState } from "react"
import { Search, ShoppingCart, PlusCircle, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { SUPERMARKET_PRODUCTS } from "@/scripts/seed_foods"

export default function SupermarketPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 space-y-6">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-primary" />
          </div>
          السوبر ماركت
        </h1>
        <p className="text-muted-foreground text-sm font-medium pr-1">قاعدة بيانات للمنتجات المغلفة بمعلوماتها الغذائية الدقيقة.</p>
      </header>

      <div className="relative">
        <Search className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="ابحث عن منتج، علامة تجارية..." 
          className="pl-3 pr-10 rounded-xl h-12 shadow-sm text-base bg-card"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4 pt-2">
        {SUPERMARKET_PRODUCTS
          .filter(product => product.product_name_ar.includes(searchTerm) || product.brand.includes(searchTerm))
          .slice(0, 15)
          .map(product => (
          <Card key={product.id} className="hover:border-primary/50 transition-all border-border shadow-sm hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{product.product_name_ar}</h3>
                  <span className="inline-flex items-center bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {product.brand}
                  </span>
                </div>
                <div className="text-center bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-xl shadow-inner min-w-[70px]">
                  <span className="block text-[10px] font-bold text-muted-foreground mb-0.5">{product.piece_options?.[0]?.name || 'حصة'}</span>
                  <span className="font-extrabold text-2xl text-primary">{product.piece_options?.[0]?.carbs || 0}</span>
                  <span className="text-xs text-muted-foreground font-medium mr-1">جم</span>
                </div>
              </div>

              <div className="flex justify-end items-center text-xs text-muted-foreground mb-4">
                <span className="bg-background px-2 py-1 rounded border shadow-sm font-medium">لكل 100 جم: <strong className="text-foreground">{product.carbs_per_100g} جم كربوهيدرات</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
                <Button variant="outline" className="h-11 font-bold text-sm gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                  <Package className="w-4 h-4" />
                  إضافة العبوة
                </Button>
                <Button variant="outline" className="h-11 font-bold text-sm gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                  <PlusCircle className="w-4 h-4" />
                  وزن مخصص
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
