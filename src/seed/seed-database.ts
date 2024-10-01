import { initialData } from "./seed";

async function main(){





    console.log(initialData)
    console.log("Seed executed correctly")
}





(()=>{
    if (process.env.NODE_ENV === "production") return
    main( )
})();