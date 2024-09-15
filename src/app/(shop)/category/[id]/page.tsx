import { notFound } from "next/navigation";
interface Props {
  params: {
    id: string;
  };
}

const validURL = ["/","admin", "cart", "checkout", "checkout/adress", "category{id}", "orders", "orders{id}",
    "product", "products", "auth", "auth/login", "auth/new-account"]

export default function ({ params }: Props) {
  const { id } = params;

  if (id !== "men" && id !== "women" && id !== "kids") {
    notFound();
  }
  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
