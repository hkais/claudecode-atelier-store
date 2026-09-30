import { getStockStatus, type StockStatus } from "@/lib/catalog";

const dotColor: Record<StockStatus, string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-accent",
  "sold-out": "bg-subtle",
};

function label(status: StockStatus, stock: number) {
  if (status === "sold-out") return "Sold out";
  if (status === "low-stock") return `Only ${stock} left`;
  return "In stock";
}

export function StockIndicator({ stock }: { stock: number }) {
  const status = getStockStatus(stock);

  return (
    <p className="flex items-center gap-2 text-sm">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotColor[status]}`} />
      <span className={status === "low-stock" ? "text-accent" : undefined}>
        {label(status, stock)}
      </span>
    </p>
  );
}
