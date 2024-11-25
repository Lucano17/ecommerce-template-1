"use server"

export const createUpdateProduct = async(formData: FormData) => {
    try {
        console.log(formData)

        return {
            ok: true,
        }
    } catch (error){
        console.log("Error creando o actualizando el producto")
        return {
            ok: false,
            message: "Error creando o actualizando el producto"
        }
    }

}