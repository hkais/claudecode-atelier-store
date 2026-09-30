import type { ReactNode } from "react";

import { PlusIcon } from "@/components/icons";

type Section = {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

// Native <details>: keyboard accessible and works without JavaScript.
export function ProductAccordion({ sections }: { sections: Section[] }) {
  return (
    <div className="border-t">
      {sections.map((section) => (
        <details key={section.title} open={section.defaultOpen} className="group border-b">
          <summary className="type-label flex list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
            {section.title}
            <PlusIcon className="size-4 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="type-body pb-6">{section.content}</div>
        </details>
      ))}
    </div>
  );
}
