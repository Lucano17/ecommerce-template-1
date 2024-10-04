import { getStockBySlug } from "@/actions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  console.log("Slug received:", slug); // Depuración
  
  if (typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }
  
  const stock = await getStockBySlug(slug);
  
  res.status(200).json({ stock });
}
