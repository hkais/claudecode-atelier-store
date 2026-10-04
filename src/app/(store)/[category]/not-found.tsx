import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="container-prose section-y flex flex-col items-center gap-5 text-center">
      <p className="type-eyebrow text-muted">Not Found</p>
      <h1 className="type-h2">We couldn&apos;t find that category</h1>
      <p className="type-body">
        It may have moved or been renamed. Explore our latest arrivals instead.
      </p>
      <Link href="/new-in" className="btn btn-primary mt-3">
        View New Arrivals
      </Link>
    </div>
  );
}
