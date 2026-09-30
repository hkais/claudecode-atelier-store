import Link from "next/link";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
};

export function SectionHeading({ id, eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
      <div className="space-y-3">
        {eyebrow ? <p className="type-eyebrow text-muted">{eyebrow}</p> : null}
        <h2 id={id} className="type-h2">
          {title}
        </h2>
      </div>
      {action ? (
        <Link href={action.href} className="btn btn-ghost shrink-0">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
