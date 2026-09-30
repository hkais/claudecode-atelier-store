import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container-prose section-y flex flex-col items-center gap-5 text-center">
      <p className="type-eyebrow text-muted">Not Found</p>
      <h1 className="type-h2">This piece is no longer available</h1>
      <p className="type-body">
        It may have sold out or been moved. Explore our latest arrivals instead.
      </p>
      <Link href="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
}
