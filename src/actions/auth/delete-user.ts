import prisma from "@/lib/prisma"



export const userDelete = async(id: string)=> {
    const deleteUser = await prisma.user.delete({
        where: {
            id: id
        }}
    )
}