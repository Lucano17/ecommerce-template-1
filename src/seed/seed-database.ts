import { initialData } from "./seed";
import prisma from "../lib/prisma"

async function main(){

    // 1. Delete previous registers.
    await Promise.all ([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    ])
    




    
    console.log("Seed executed correctly")
}





(()=>{
    if (process.env.NODE_ENV === "production") return
    main( )
})();