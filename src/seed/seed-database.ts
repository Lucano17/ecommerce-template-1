import { initialData } from "./seed";
import prisma from "../lib/prisma"

async function main() {

    // 1. Delete previous registers.
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ])

    // Categories
    const { categories, products } = initialData
    const categoriesData = categories.map((name) => ({ name }))
    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[ category.name.toLowerCase()] = category.id;
        return map;
      }, {} as Record<string, string>); //<string=shirt, string=categoryID>



    console.log(categoriesData)
    console.log("Seed executed correctly")
}





(() => {
    if (process.env.NODE_ENV === "production") return
    main()
})();