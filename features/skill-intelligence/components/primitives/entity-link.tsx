import Link from "next/link";
import { ArrowRight } from "lucide-react";

type EntityLinkProps = {
  href: string;
  name: string;
  meta?: string;
};

export function EntityLink({ href, name, meta }: EntityLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/35"
    >
      <span>{name}</span>
      {meta ? <span className="font-normal text-muted-foreground">{meta}</span> : null}
      <ArrowRight
        className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
