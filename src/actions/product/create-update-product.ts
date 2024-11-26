"use server"
import prisma from "@/lib/prisma"
import { Gender, Product, Size } from "@prisma/client"
import { z } from "zod"

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
    try {
        const data = Object.fromEntries(formData)
        const productParsed = productSchema.safeParse(data)

        if (!productParsed.success) {
            
            console.log(productParsed.error)
            return {ok: false}

        } else {

            const product = productParsed.data

            product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim()

            const {id, ...rest} = product

            const prismaTx = prisma.$transaction(async(tx) => {

                let product: Product

                const tagsArray = rest.tags.split(",").map( tag => tag.trim().toLowerCase())
                const sizesArray = (rest.sizes as string[]).map((size) => size.trim() as Size);

                if (id) {
                    product = await prisma.product.update({
                        where: {id},
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


                    console.log({updatedProduct: product})

                } else {

                }


                return {
                    
                }
            })

        }

        return {
            ok: true,
        }
    } catch (error) {
        console.log("Error creando o actualizando el producto")
        return {
            ok: false,
            message: "Error creando o actualizando el producto"
        }
    }

}