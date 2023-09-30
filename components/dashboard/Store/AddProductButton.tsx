'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function AddProductButton() {
    const router = useRouter()
    const handleAddProduct = () => {
        router.push("/admin/my-store/add-product")
    }
    return(
        <Button className="w-full text-white mt-4" onClick={handleAddProduct}>
            Add Product
        </Button>
    )
}