import ThisIs from "@/components/page-components/category/ThisIs";
import WhichIs from "@/components/page-components/category/WhichIs";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <div className="md:container mx-auto xl:px-2 lg:space-y-6">
      <ThisIs params={params} />
      <WhichIs params={params} />
    </div>
  );
}
