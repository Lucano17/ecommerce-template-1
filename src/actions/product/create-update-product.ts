"use server"
import prisma from "@/lib/prisma"
import { Gender, Product, Size } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config(process.env.CLOUDINARY_UR ?? "")

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0))),
    sizes: z
        .string()
        .transform((val) => val.split(",").map((v) => v.trim() as Size))
        .refine((sizes) => sizes.every((size) => Object.values(Size).includes(size)), {
            message: "Invalid size value",
        }),
    tags: z.string(),
    categoryId: z.string().uuid(),
    gender: z.nativeEnum(Gender),
})
export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)

    if (!productParsed.success) {
        return { ok: false }

    } else {

        const product = productParsed.data

        product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim()

        const { id, ...rest } = product
        try {
            const prismaTx = prisma.$transaction(async (tx) => {

                let product: Product

                const tagsArray = rest.tags.split(",").map(tag => tag.trim().toLowerCase())
                const sizesArray = (rest.sizes as string[]).map((size) => size.trim() as Size);

                if (id) {
                    product = await prisma.product.update({
                        where: { id },
                        data: {
                            ...rest,
                            sizes: {
                                set: sizesArray,
                            },
                            tags: {
                                set: tagsArray
                            },
                        }
                    })

                } else {
                    product = await prisma.product.create({
                        data: {
                            ...rest,
                            sizes: {
                                set: sizesArray
                            },
                            tags: {
                                set: tagsArray
                            }
                        }
                    })
                }

                if (formData.getAll("images")) {
                    const images = await uploadImages(formData.getAll("images") as File[])

                    if (!images) {
                       throw new Error ("No se pudo cargar las imágenes") 
                    }

                    await prisma.productImage.createMany({
                        data: images.map( image => ({
                            url: image!,
                            productId: product.id
                        }))
                    })
                }

                return {
                    product
                }
            })

            revalidatePath("/admin/products")
            revalidatePath(`/admin/products/${product.slug}`)
            revalidatePath(`/products/${product.slug}`)

            return {
                ok: true,
                product: (await prismaTx).product,
            }
        } catch (error) {
            return {
                ok: false,
                message: "Error creando o actualizando el producto"
            }
        }

    }
}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {

                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString("base64")

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url)
            } catch (error) {
                return null
            }
        })

        const uploadedImages = await Promise.all(uploadPromises)
        return uploadedImages

    } catch (error) {
        return null
    }
}