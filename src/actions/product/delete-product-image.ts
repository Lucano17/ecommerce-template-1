"use server"

import prisma from "@/lib/prisma"
import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

cloudinary.config(process.env.CLOUDINARY_UR ?? "")

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    if (!imageUrl.startsWith("http")) {
        return {
            ok: false,
            error: "No se pueden borrar imagenes de file-system"
        }
    }

    
        const imageName = imageUrl
        .split("/")
        .pop()
        ?.split(".")[0] ?? ""
    
        if (!imageName) {
            return {
                ok: false,
                message: "No se ha encontrado el imageName"
            }
        }

        try {
            await cloudinary.uploader.destroy(imageName)
            const deletedImage = await prisma.productImage.delete({
                where: {
                    id: imageId
                },
                select: {
                    product: {
                        select: {
                            slug: true
                        }
                    }
                }
            })

            revalidatePath(`/admin/products`)
            revalidatePath(`/admin/products/${deletedImage.product.slug}`)
            revalidatePath(`/products/${deletedImage.product.slug}`)


    } catch (error) {
        return {
            ok: false,
            message: "No se pudo eliminar la imagen"
        }
    }

   
}