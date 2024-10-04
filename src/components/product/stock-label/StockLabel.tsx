"use client"

import { getProductBySlug, getStockBySlug } from "@/actions";
import { useEffect } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({slug}:Props) => {
    useEffect(()=>{
        getStock()
    },[])
    const getStock = async()=> {
        const inStock = getStockBySlug(slug)
        console.log(inStock)
    }
    
    return (
        <h1>Stock: 150</h1>
    )
}
