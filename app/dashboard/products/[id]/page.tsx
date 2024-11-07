import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function EditRoute({ params }: { params: { id: string } }) {
  noStore();
  const productId = params.id; // Separate `params.id` into a constant
  const data = await getData(productId); // Pass `productId` to `getData`
  return <EditForm data={data} />;
}
